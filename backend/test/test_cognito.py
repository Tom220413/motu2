import boto3
from moto import mock_cognitoidp
import pytest
import jwt
import os
import importlib
import requests


@pytest.fixture(scope="session", autouse=True)
def aws_credentials():
    # ダミークレデンシャル
    os.environ["AWS_ACCESS_KEY_ID"] = "testing"
    os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
    os.environ["AWS_SECURITY_TOKEN"] = "testing"
    os.environ["AWS_SESSION_TOKEN"] = "testing"
    os.environ["AWS_DEFAULT_REGION"] = "ap-northeast-1"


@pytest.fixture()
def cognitoidp(aws_credentials):
    with mock_cognitoidp():
        yield boto3.client("cognito-idp", "ap-northeast-1")


@pytest.fixture()
def cognito_userpool(cognitoidp):
    # ユーザープールの作成
    userpool = cognitoidp.create_user_pool(
        PoolName=f"misato-app-admin-userpool-test",
    )

    # クライアントの作成
    userpool_client = cognitoidp.create_user_pool_client(
        UserPoolId=userpool["UserPool"]["Id"],
        ClientName=f"misato-app-admin-userpool-client-test",
    )

    # ユーザーの作成
    user_name = "test-user"
    password = "P@ssw0rd"
    cognitoidp.admin_create_user(
        UserPoolId=userpool["UserPool"]["Id"],
        Username=user_name,
        MessageAction="SUPPRESS",
    )
    # ユーザーの永続的なパスワードを設定
    cognitoidp.admin_set_user_password(
        UserPoolId=userpool["UserPool"]["Id"],
        Username=user_name,
        Password=password,
        Permanent=True,
    )

    # Cognitoアクセストークンの取得
    token_response = cognitoidp.admin_initiate_auth(
        UserPoolId=userpool["UserPool"]["Id"],
        ClientId=userpool_client["UserPoolClient"]["ClientId"],
        AuthFlow="ADMIN_USER_PASSWORD_AUTH",
        AuthParameters={
            "USERNAME": user_name,
            "PASSWORD": password,
        },
    )

    os.environ["COGNITO_POOL_ID"] = userpool["UserPool"]["Id"]

    yield {
        "token": token_response["AuthenticationResult"]["AccessToken"],
        "client_id": userpool_client["UserPoolClient"]["ClientId"],
        "pool_id": userpool["UserPool"]["Id"],
    }


# Cognitoアクセストークン検証用鍵生成情報（パブリックJSON Webキーの一覧）のモック
@pytest.fixture
def fetch_public_keys(cognito_userpool):
    pool_id = cognito_userpool["pool_id"]
    region = os.environ["AWS_DEFAULT_REGION"]

    keys_url = (
        f"https://cognito-idp.{region}.amazonaws.com/{pool_id}/.well-known/jwks.json"
    )
    response = requests.get(keys_url).json()

    # ユーザー検証に利用する鍵を取得（公開鍵）
    jwks_client = jwt.PyJWK(response["keys"][0])
    signing_key = jwks_client.key
    return signing_key


def test_check_expiration(cognito_userpool, mocker, fetch_public_keys):
    common_token = importlib.import_module("token_check")
    token = cognito_userpool["token"]

    # _get_keyメソッドをモック(検証用鍵の取得リクエストをモック)
    mocker.patch(
        "token_check._get_key",
        return_value=fetch_public_keys,
    )

    ret = common_token.check_expiration(token)
    assert ret == True

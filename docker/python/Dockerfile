# AlpineベースのPythonイメージを使用
FROM python:3.9-alpine
WORKDIR /app

# 必要なパッケージのインストール
RUN apk add --no-cache gcc musl-dev libffi-dev openssl-dev

# Pythonの依存関係ファイルをコピー
COPY ./docker/python/requirements.txt /app/requirements.txt

# 依存関係のインストール
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# アプリケーションのソースコードをコピー
COPY ./backend/ /app/

# コンテナがリッスンするポートを指定
EXPOSE 8080

# アプリケーションの起動コマンド
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8080"]

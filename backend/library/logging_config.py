import logging


def setup_logger():
    
    # ロガーの設定
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG)  # DEBUGレベル以上のすべてのログをキャプチャ

    # 標準ログファイルのハンドラ（例えば、INFO以上）
    file_handler = logging.FileHandler("log/app.log")
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(
        logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    )

    # エラーログファイルのハンドラ（ERROR以上）
    error_file_handler = logging.FileHandler("log/error.log")
    error_file_handler.setLevel(logging.ERROR)
    error_file_handler.setFormatter(
        logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    )

    # ハンドラをロガーに追加
    logger.addHandler(file_handler)
    logger.addHandler(error_file_handler)

    return logger

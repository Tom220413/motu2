import time

def get_unixtime() -> int:
    return int(time.time() * 1000)

# Node.js 20のAlpine Linux版をベースイメージとして使用
FROM node:20-alpine

# コンテナ内の作業ディレクトリを設定
WORKDIR /app

# プロジェクトの依存関係をコピー
COPY ../frontend/react-project/package*.json ./

# npm を最新にアップデート
RUN npm install -g npm@latest
RUN npm cache verify
# 依存関係をインストール
RUN npm install

# browserslist-db を更新
RUN npx update-browserslist-db@latest

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションの起動コマンドを指定
CMD ["npm", "start"]

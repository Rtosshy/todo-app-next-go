# Frontend

## 概要

Next.js 16 (App Router) + React 19 による Todo アプリケーション

- **型安全**: OpenAPI 3.0 から TypeScript 型を自動生成
- **バリデーション**: Zod + react-hook-form でフォーム検証
- **セキュリティ**: CSRF + JWT 認証によるセキュアな通信

## アーキテクチャ

### ディレクトリ構造

```bash
frontend/
  └── src/
      ├── app/              # Next.js App Router
      │   ├── login/        # ログインページ
      │   ├── signup/       # サインアップページ
      │   ├── todos/        # Todo管理ページ
      │   └── ui/           # 共通UIコンポーネント
      ├── gen/              # OpenAPIから生成（編集禁止）
      │   ├── api-client.ts # 型付きAPIクライアント
      │   └── schemas/      # Zodバリデーションスキーマ
      └── lib/              # ユーティリティ関数
```

## ローカル PC でのセットアップ

### 必要環境

- Node.js 20+
- yarn

#### 1. リポジトリのクローン

```bash
git clone https://github.com/Rtosshy/todo-app-next-go.git
cd todo-app-next-go
cd frontend
```

#### 2. 依存関係のインストール

```bash
yarn install
```

#### 3. バックエンドの起動

フロントエンドは `http://localhost:8080` で動作するバックエンド API に接続します

先にバックエンドを起動してください（詳細は `backend/README.md` 参照）

#### 4. 開発サーバーの起動

```bash
yarn dev
```

アプリケーションが `http://localhost:3000` で起動します

## 開発方法

### よく使うコマンド

```bash
# 開発サーバー起動
yarn dev

# OpenAPI から型生成
yarn gen

# Lint
yarn lint
```

### OpenAPI 駆動開発のワークフロー

1. Backend で `api/openapi.yaml` を編集
2. Backend で `make gen` でコード生成
3. **Frontend で `yarn gen` で型と API クライアントを生成**
4. 生成された型を使って実装

生成されるもの：

- `src/gen/api-client.ts`: 型付き Axios クライアント
- `src/gen/schemas/`: Zod バリデーションスキーマ

### セキュリティフロー

1. CSRF トークン取得: `GET /api/v1/csrf`
2. 全ての状態変更リクエストに `X-CSRF-Token` ヘッダーを付与
3. ログイン後、JWT トークンが HTTP-only cookie に保存される

## AWS EC2 へのデプロイ

### 前提条件

- AWS EC2 インスタンス作成済み (Amazon Linux, t3.micro)
- バックエンド API 稼働中

#### 1. Node.js のインストール

```bash
# システムのアップデート
sudo yum update -y

# Node.js 23.xのインストール
curl -fsSL https://rpm.nodesource.com/setup_23.x | sudo bash -
sudo yum install -y nodejs

# インストール確認
node -v
# 出力： v23.x.x

npm -v
# 出力： v10.x.x
```

#### 2. Git のインストール

```bash
sudo yum install -y git
```

#### 3. nginx のインストール

```bash
sudo yum install -y nginx

# nginxの起動と自動起動設定
sudo systemctl start nginx
sudo systemctl enable nginx

# 状態確認
sudo systemctl status nginx
```

#### 4. アプリケーションのクローン

```bash
cd ~
git clone https://github.com/Rtosshy/todo-app-next-go.git
cd todo-app-next-go/frontend
```

#### 5. 環境変数の設定

```bash
vi .env
```

以下の内容を入力

```env
NEXT_PUBLIC_API_URL=http://<backend-server-dns>/api/v1
```

#### 6. 依存関係のインストールとビルド

```bash
# 依存関係のインストール
npm install

# プロダクションビルド
npm run build
```

#### 7. 動作確認(テスト起動)

```bash
# テスト起動
npm start

# 別のターミナルでテスト
curl http://localhost:3000
# HTMLが返ってくればOK
```

#### 8. nginx の設定

```bash
# nginx設定ファイルを編集
sudo vi /etc/nginx/nginx.conf
```

以下の内容を入力

```nginx
http {
 ...
 server {
   ...
   // 下記を追加
   location / {
    proxy_pass http://localhost:3000;
   }
  ...
 }
 ...
}
```

保存後

```bash
# nginx設定のテスト
sudo nginx -t

# nginxの再起動
sudo systemctl restart nginx
```

#### 9. systemd サービスの作成

```bash
sudo vi /etc/systemd/system/todo-frontend.service
```

以下の内容を入力

```ini
[Unit]
Description=Todo Frontend Next.js
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/home/ec2-user/todo-app-next-go/frontend
Environment="NODE_ENV=production"
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

保存後

```bash
# サービスの有効化と起動
sudo systemctl daemon-reload
sudo systemctl enable todo-frontend
sudo systemctl start todo-frontend

# 状態確認
sudo systemctl status todo-frontend

# ログ確認
sudo journalctl -u todo-frontend -f
```

#### 10. 動作確認(ローカルアクセス)

```bash
# EC2内からアクセス
curl http://localhost:80
# HTMLが返ってくればOK

curl http://localhost:3000
# Next.jsが直接応答することを確認
```

## その他

### API 接続先

- Backend URL: `http://localhost:8080/api/v1`
- 設定ファイル: `orval.config.js`

### 主な技術スタック

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Form**: react-hook-form + @hookform/resolvers
- **Validation**: Zod v4
- **HTTP Client**: Axios
- **Code Generation**: Orval

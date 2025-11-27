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
  ├── src/
  │   ├── app/              # Next.js App Router
  │   │   ├── login/        # ログインページ
  │   │   ├── signup/       # サインアップページ
  │   │   ├── todos/        # Todo管理ページ
  │   │   └── ui/           # 共通UIコンポーネント
  │   ├── gen/              # OpenAPIから生成（編集禁止）
  │   │   ├── api-client.ts # 型付きAPIクライアント
  │   │   └── schemas/      # Zodバリデーションスキーマ
  │   └── lib/              # ユーティリティ関数
```

## セットアップ

### 必要環境

- Node.js 20+
- yarn

### クイックスタート

#### 1. 依存関係のインストール

```bash
cd frontend
yarn install
```

#### 2. バックエンドの起動

フロントエンドは `http://localhost:8080` で動作するバックエンド API に接続します

先にバックエンドを起動してください（詳細は `backend/README.md` 参照）

#### 3. 開発サーバーの起動

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

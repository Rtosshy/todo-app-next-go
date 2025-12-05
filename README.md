# todo-app-next-go

## 概要

Next.js + Go + PostgreSQL による Todo アプリケーション

## アプリケーション URL

[todo-app-next-go](https://todo-app-drab-one-93.vercel.app)

### 動作環境

PC版Google Chrome

## ディレクトリ構造

```bash
todo-app-next-go/
  ├── frontend/  # フロントエンドコード（Next.js）
  ├── backend/   # バックエンドコード（Go）
  └── docs/      # ドキュメント用図・画像・動画
```

## ローカル PC でのセットアップ

### 必要環境

- Node.js 20+
- yarn
- Go 1.25+
- PostgreSQL
- Docker
- make

#### 1. リポジトリのクローン

```bash
git clone https://github.com/Rtosshy/todo-app-next-go.git
cd todo-app-next-go
```

#### 2. Next.js サーバーの起動

```bash
cd frontend
yarn install
yarn dev
```

#### 3. バックエンド環境変数の設定

```bash
# 別のシェルを立ち上げて
cd backend
vi .env.development
```

以下の内容を入力

```env
DB_USER=app
DB_PASSWORD=password
DB_NAME=api_database
DB_HOST=localhost
DB_PORT=5432
DB_SSL_MODE=disable
```

#### 4. Go サーバーと PostgreSQL コンテナの起動

```bash
make external-up
make run
```

#### 5. Web ブラウザで動作確認

ブラウザのアドレスバーに`http://localhost:3000`を入力

## Frontend

### 概要

Next.js 16 (App Router) + React 19 による Todo アプリケーション

詳細は frontend/README.md をご覧ください
[frontend/README.md](./frontend/README.md)

## Backend

### 概要

Go + Clean Architecture による Todo API サーバー

詳細は backend/README.md をご覧ください
[backend/README.md](./backend/README.md)

## インフラ構成図

![infra](./docs/infra.png)

## トラブルシューティング

### モバイルブラウザからのログイン失敗（未解決）

#### 症状
- モバイル Safari/Chrome からログイン時に "csrf token required" エラー（403）が発生
- PC Chrome では正常に動作

#### 原因
クロスドメイン環境（`vercel.app` ↔ `onrender.com`）での Cookie 送信がブラウザによってブロックされる。

**技術的詳細：**
- フロントエンド: `todo-app-drab-one-93.vercel.app` (Vercel)
- バックエンド: `todo-app-next-go.onrender.com` (Render)
- CSRF トークンは Cookie（`_csrf`）とリクエストヘッダー（`X-CSRF-Token`）の両方が必要
- Cookie の設定: `SameSite=None; Secure; Domain=""`

#### 動作状況

| ブラウザ | 動作 | 理由 |
|---------|------|------|
| PC Chrome | ✅ 成功 | クロスサイト Cookie を許可 |
| PC Safari | ❌ 失敗 | ITP (Intelligent Tracking Prevention) により Cookie がブロック |
| Mobile Safari | ❌ 失敗 | ITP により Cookie がブロック |
| Mobile Chrome | ❌ 失敗 | プライバシー保護により Cookie がブロック |

#### 調査結果
1. CSRF トークンは正しく生成され、Response Cookie として送信されている
2. Cookie の設定（`SameSite=None`, `Secure=true`, `Domain=""`, CORS `AllowCredentials=true`, Axios `withCredentials=true`）は正しい
3. Safari では Cookie がブラウザのストレージに保存されない
4. Mobile Chrome では Cookie は保存されるが、リクエストに送信されない

#### 試した対策
- ✅ `API_DOMAIN` 環境変数を空に設定（Cookie の `Domain` 属性を空にする）
- ✅ CORS 設定の確認（`AllowCredentials: true`）
- ✅ フロントエンド Axios 設定の確認（`withCredentials: true`）
- ❌ 上記の対策でも Safari および Mobile Chrome では動作せず

#### 将来の解決策

**Option 1: 同じドメインのサブドメインを使用**
```
現在:
  Frontend: todo-app-drab-one-93.vercel.app
  Backend:  todo-app-next-go.onrender.com

推奨:
  Frontend: app.yourdomain.com
  Backend:  api.yourdomain.com
```
Cookie の `Domain` 属性を `.yourdomain.com` に設定することで、サブドメイン間で Cookie を共有できる。

**Option 2: Vercel の Rewrites 機能を使用**
フロントエンドから `/api/*` へのリクエストをバックエンドにプロキシすることで、同一オリジンとして扱われる。

#### 一時的な回避策（開発・テスト用）

**iPhone Safari の設定変更:**
1. 設定アプリ → Safari
2. プライバシーとセキュリティ
3. 「サイト越えトラッキングを防ぐ」をオフ

**Mac Safari の設定変更:**
1. Safari → 設定
2. プライバシー
3. 「サイト越えトラッキングを防ぐ」をオフ

**注意:**
- この設定変更はユーザーのプライバシーを危険にさらす
- 本番環境の解決策としては不適切
- あくまで開発・テスト用の一時的な対処法

#### 参考情報
- [Safari ITP について](https://webkit.org/blog/7675/intelligent-tracking-prevention/)
- [Chrome のサードパーティ Cookie 廃止計画](https://developer.chrome.com/docs/privacy-sandbox/third-party-cookie-phase-out/)
- 調査日: 2025-12-05

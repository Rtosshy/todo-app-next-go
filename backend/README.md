# Backend

## 概要

Go + Clean Architecture による Todo API サーバー

- **レイヤー分離**: Controller / Usecase / Gateway で責務を明確化
- **型安全**: OpenAPI 3.0 からコード自動生成
- **セキュリティ**: CSRF + JWT 多層認証
- **テスタブル**: インターフェース駆動で疎結合な設計

## アーキテクチャ

### ディレクトリ構造

```bash
backend/
  ├── entity/          # ドメインモデル（Task, User, Status）
  ├── usecase/         # ビジネスロジック（認証、検証）
  ├── adapter/
  │   ├── gateway/     # リポジトリ実装（DBアクセス）
  │   └── controller/  # HTTPハンドラ、ミドルウェア
  └── infrastructure/  # 外部依存（GORM, Ginサーバー）
```

## セットアップ

### 必要環境

- Go 1.23+
- PostgresSQL
- Docker

### クイックスタート

#### 1. PostgreSQL の起動

```bash
# Docker で PostgreSQL を起動
make external-up
```

#### 2. 環境変数の設定

`.env.development`を用意

```bash
DB_USER=app
DB_PASSWORD=password
DB_DATANAME=api_database
DB_HOST=localhost
DB_PORT=5432
DB_SSL_MODE=disable
```

カスタマイズが必要な場合は編集してください（デフォルト値は `infrastructure/database/config.go` 参照）

#### 3. サーバーの起動

```bash
make run
```

サーバーが `http://localhost:8080` で起動します。

---

### Docker を使った起動（推奨）

すべてを Docker で起動する場合：

```bash
# Backend + PostgreSQL + Swagger UI をまとめて起動
make docker-compose-up

# 停止
make docker-compose-down
```

起動後：

- API: `http://localhost:8080`
- Swagger UI: `http://localhost:8001`

## 開発方法

### よく使うコマンド

```bash
# サーバー起動
make run

# OpenAPI 仕様からコード生成
make gen

# テスト実行
go test ./...

# コード品質チェック
make prettier  # lint + vet + fmt + imports

# 利用可能なコマンド一覧
make help
```

### OpenAPI 駆動開発のワークフロー

1. `api/openapi.yaml` を編集
2. `make gen` でコード生成
3. 生成された `adapter/controller/presenter/api.go` を基に実装

## その他

### API 仕様

- OpenAPI 仕様: `api/openapi.yaml`
- Swagger UI: `http://localhost:8001` (docker-compose 起動時)

### Curl での API のテストコマンド

```bash
# /api/health
curl http://localhost:8080/api/health
```

```bash
# /api/v1/csrf
curl http://localhost:8080/api/v1/csrf
```

```bash
# /api/v1/signup
curl -c cookies.txt -X POST http://localhost:8080/api/v1/signup \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: <csrf-token>" \
  -H "Cookie: _csrf=<csrf-token>" \
  -d '{
    "user": {
        "email": "email@email.com",
        "password": "password"
    }
}'
```

```bash
# /api/v1/login
curl -c cookies.txt -X POST http://localhost:8080/api/v1/login \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: <csrf-token>" \
  -H "Cookie: _csrf=<csrf-token>" \
  -d '{
    "user": {
        "email": "email@email.com",
        "password": "email"
    }
}'
```

```bash
# /api/v1/tasks
curl -X POST http://localhost:8080/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: <csrf-token>" \
  -H "Cookie: _csrf=<csrf-token>; token=<jwt-token>" \
  -d '{
  "kind": "task",
  "name": "test",
  "status": {
    "name": "todo"
  }
}'
```

```bash
# /api/v1/tasks
curl -X GET http://localhost:8080/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: <csrf-token>" \
  -H "Cookie: _csrf=<csrf-token>; token=<jwt-token>"
```

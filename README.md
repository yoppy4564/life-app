# Life Plan App (Docker 環境)

Next.js + FastAPI + PostgreSQL で構成されたライフプランアプリの Docker 設定です。本番向け `docker-compose.yml` と、開発向け `docker-compose.dev.yml` を用意しています。

## 前提条件

- Docker / Docker Compose v2 以降がインストール済み
- このリポジトリをクローン済み

## 本番構成

`docker-compose.yml` は各サービスの本番イメージをビルドし、ソースをコンテナ内へコピーして起動します。

```bash
# 本番用イメージのビルドと起動
docker compose build
docker compose up -d

# 停止
docker compose down
```

- フロントエンド: http://localhost:3000
- バックエンド (Swagger UI): http://localhost:8000/docs
- PostgreSQL: localhost:5432（ユーザー/パスワードともに `postgres`）

永続化ボリュームは `db-data` を使用します。

## 開発構成

`docker-compose.dev.yml` は `Dockerfile.dev` を利用し、ホストのソースコードをコンテナへマウントしてホットリロードを有効にします。DB 用ボリュームは `db-data-dev` として本番と分離しています。

```bash
# 開発向け起動
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up -d

# ログ確認
docker compose -f docker-compose.dev.yml logs -f frontend

# 停止
docker compose -f docker-compose.dev.yml down
# DB を初期化する場合
docker compose -f docker-compose.dev.yml down -v
```

## Dockerfile 一覧

- `frontend/Dockerfile` : Node.js 24 を使用した本番ビルド
- `frontend/Dockerfile.dev` : Node.js 24 ベースの開発用イメージ（ソースはマウント）
- `backend/Dockerfile` : Python 3.13 を使用した本番ビルド
- `backend/Dockerfile.dev` : Python 3.13 ベースの開発用イメージ（ソースはマウント）

## 環境変数

`backend/.env.example` を参考に `backend/.env` を作成すると、API の設定値を上書きできます。本番環境では適切なシークレット値に変更してください。

## 次のステップ

- FastAPI にユーザー、収支、資産などのドメインモデルを追加
- 認証 (JWT) や CRUD API を段階的に実装
- Redux Toolkit でフロントエンドの状態管理ロジックを構築
- Chart.js / Recharts で資産推移グラフを描画

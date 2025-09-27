# Life Plan App (Docker 開発環境)

ライフプランアプリのローカル開発用 Docker 環境を構築するテンプレートです。Next.js フロントエンド、FastAPI バックエンド、PostgreSQL を docker-compose で起動します。

## 前提条件

- Docker / Docker Compose がインストール済み
- このリポジトリをクローン済み

## 使い方

```bash
# 依存関係の初回インストール（任意）
docker compose build

# コンテナの起動
docker compose up -d

# ログ確認
docker compose logs -f frontend
```

起動後に以下へアクセスできます。

- フロントエンド: http://localhost:3000
- バックエンド (Swagger UI): http://localhost:8000/docs
- PostgreSQL: localhost:5432（ユーザー/パスワードともに `postgres`）

## プロジェクト構成

```
life-app/
├── backend/          # FastAPI アプリケーション
├── frontend/         # Next.js アプリケーション
├── docker-compose.yml
└── README.md
```

## 環境変数

`backend/.env.example` を参考に `backend/.env` を作成すると、ローカル環境向けの設定を上書きできます。

## よくある操作

```bash
# コンテナ停止
docker compose down

# 再ビルド
docker compose build --no-cache

# DB の永続化ボリュームを削除（データ初期化）
docker compose down -v
```

## 次のステップ

- FastAPI にユーザー、収支、資産などのドメインモデルを追加
- 認証 (JWT) や CRUD API を段階的に実装
- Redux Toolkit でフロントエンドの状態管理ロジックを構築
- Chart.js / Recharts で資産推移グラフを描画


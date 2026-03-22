# VOD作品紹介サイト

映画・ドラマ・アニメ・ライブ・スポーツの作品を紹介する個人ブログ風サイト。

## 技術スタック

- **フレームワーク:** Next.js 16.2.1 (App Router)
- **スタイリング:** TailwindCSS 4.0 + daisyUI
- **CMS:** microCMS
- **ホスティング:** Cloudflare Pages

## 特徴

- 🎬 5つのカテゴリ（映画/ドラマ/アニメ/ライブ/スポーツ）
- 📂 ジャンル別分類
- 📝 microCMSで記事管理（ブラウザ管理画面で編集可能）
- 🚀 高速（ISR - Incremental Static Regeneration）
- 📱 レスポンシブ対応
- ♿ アクセシビリティ対応
- 💰 完全無料

## 開発環境セットアップ

### 必要なもの

- Node.js 18.18以上
- npm または yarn
- microCMSアカウント

### インストール

```bash
npm install
```

### 環境変数設定

1. `.env.local.example` をコピーして `.env.local` を作成

```bash
cp .env.local.example .env.local
```

2. `.env.local` を編集して、microCMSのAPIキーを設定

```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

### 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 でサイトが開きます。

### ビルド

```bash
npm run build
```

### 本番サーバー起動

```bash
npm run start
```

## microCMS設定

### API作成

1. microCMSダッシュボード → 「API作成」
2. API名: `posts`
3. エンドポイント: `posts`
4. APIの型: **リスト形式**

### フィールド設定

| フィールドID | 表示名 | 種類 | 必須 | 説明 |
|------------|--------|------|------|------|
| `title` | タイトル | テキストフィールド | ✅ | 作品タイトル |
| `description` | 説明 | テキストエリア | ✅ | 簡潔な説明（120文字以内） |
| `category` | カテゴリ | セレクトフィールド | ✅ | 映画/ドラマ/アニメ/ライブ/スポーツ |
| `genre` | ジャンル | テキストフィールド | ✅ | アクション、ドラマ等 |
| `releaseYear` | 公開年 | 数値 |  | 2024など |
| `rating` | 評価 | 数値 |  | 0.0〜5.0 |
| `thumbnail` | サムネイル | 画像 |  | メイン画像 |
| `content` | 本文 | リッチエディタ | ✅ | 記事本文 |
| `vodServices` | VODサービス | 繰り返しフィールド |  | Netflix等 |
| `tags` | タグ | 複数選択 |  | アクション、サスペンス等 |
| `publishedAt` | 公開日 | 日時 |  | 投稿日 |

### categoryのセレクト値

- 映画
- ドラマ
- アニメ
- ライブ
- スポーツ

### vodServicesの繰り返しフィールド

- `name` (テキスト): Netflix、Amazon Prime Video等
- `url` (テキスト): サービスURL
- `available` (真偽値): 配信中かどうか

## 記事の書き方（minori向け）

### 1. microCMS管理画面にログイン

https://your-service-domain.microcms.io/

### 2. 「posts」API → 「コンテンツを追加」

### 3. 各フィールドを入力

**タイトル:**
- 例: 「ミッション:インポッシブル - デッドレコニング PART ONE」

**説明:**
- 120文字以内
- 例: 「トム・クルーズ主演の大ヒットアクションシリーズ最新作。前代未聞のスタントと圧倒的な映像美で魅せる超大作アクション映画。」

**カテゴリ:**
- セレクトから選択（映画/ドラマ/アニメ/ライブ/スポーツ）

**ジャンル:**
- 例: 「アクション」

**公開年:**
- 例: 2023

**評価:**
- 0.0〜5.0
- 例: 4.8

**サムネイル:**
- 画像をアップロード（Unsplash等から）

**本文:**
- リッチエディタで自由に記述
- 見出し、太字、リスト、画像など使用可能

**VODサービス:**
- 「+ 追加」で複数登録可能
  - name: Netflix
  - url: https://www.netflix.com
  - available: ✅（配信中の場合）

**タグ:**
- 複数選択可能
- 例: アクション、サスペンス、洋画

**公開日:**
- 投稿日を設定

### 4. 「公開」をクリック

即座にサイトに反映されます（60秒以内に更新）。

## Cloudflare Pagesデプロイ

### 初回デプロイ

1. GitHubリポジトリを作成・push
2. Cloudflare Dashboard → Pages → 「プロジェクトを作成」
3. GitHubリポジトリを選択
4. ビルド設定:
   - フレームワーク: Next.js
   - ビルドコマンド: `npm run build`
   - 出力ディレクトリ: `.next`
5. 環境変数を設定:
   - `MICROCMS_SERVICE_DOMAIN`
   - `MICROCMS_API_KEY`
6. 「デプロイ」をクリック

### 更新デプロイ

1. ローカルで変更
2. Git commit & push
3. Cloudflare Pagesが自動デプロイ

## フォルダ構造

```
vod-site-minori/
├── app/                      # Next.jsページ
│   ├── layout.tsx           # 共通レイアウト
│   ├── page.tsx             # トップページ
│   ├── category/[category]/ # カテゴリページ
│   │   └── [genre]/        # ジャンルページ
│   └── post/[id]/          # 記事詳細ページ
├── lib/                     # ユーティリティ
│   └── microcms.ts         # microCMSクライアント
└── public/                  # 静的ファイル
```

## トラブルシューティング

### ビルドエラー

```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
npm run build
```

### microCMS接続エラー

1. `.env.local` が正しく設定されているか確認
2. APIキーが正しいか確認
3. microCMSでAPIが作成されているか確認

### 記事が表示されない

1. microCMSで記事を「公開」しているか確認
2. 60秒待つ（ISRのキャッシュ更新）
3. ブラウザをリロード

## ライセンス

MIT

## 制作者

- 開発: saburo
- プロジェクトリーダー: minori
- サポート: mi26rock

# minori向け記事編集ガイド

このガイドでは、Markdownで記事を書く方法を詳しく説明します。

## 準備するもの

### 1. テキストエディタ

おすすめエディタ（どちらか選んでください）:

- **VS Code**（無料、人気）
  - ダウンロード: https://code.visualstudio.com/
  - Markdownプレビュー機能あり

- **Typora**（有料、シンプル）
  - ダウンロード: https://typora.io/
  - リアルタイムプレビュー

### 2. Git（バージョン管理）

- ダウンロード: https://git-scm.com/
- インストール後、ターミナルで確認:
  ```bash
  git --version
  ```

## 記事の書き方（ステップ・バイ・ステップ）

### Step 1: フォルダ構造を確認

記事は以下のフォルダに配置します:

```
content/
├── 映画/
│   ├── アクション/
│   ├── ドラマ/
│   ├── SF/
│   ├── ホラー/
│   ├── コメディ/
│   └── ファンタジー/
├── ドラマ/
│   ├── 国内ドラマ/
│   ├── 海外ドラマ/
│   └── 韓国ドラマ/
├── アニメ/
│   ├── 少年向け/
│   ├── 少女向け/
│   ├── 青年向け/
│   └── 子供向け/
├── ライブ/
│   ├── 音楽/
│   ├── コンサート/
│   └── 舞台/
└── スポーツ/
    ├── サッカー/
    ├── 野球/
    ├── バスケ/
    └── その他/
```

### Step 2: 新しい記事ファイルを作成

**例: アクション映画の記事を書く場合**

1. `content/映画/アクション/` フォルダを開く
2. 新しいファイルを作成（例: `top-gun-maverick.md`）
3. ファイル名は半角英数字とハイフンのみ使用

**ファイル名のルール:**
- ✅ 良い例: `top-gun-maverick.md`, `mission-impossible.md`
- ❌ ダメな例: `トップガン.md`, `Top Gun.md`, `トップガン マーヴェリック.md`

### Step 3: テンプレートをコピー

`content/映画/アクション/_template.md` を開いて、全内容をコピーします。

### Step 4: メタデータ（Front Matter）を編集

ファイルの最初の部分（`---` で囲まれた部分）を編集します。

```markdown
---
title: "トップガン マーヴェリック"
description: "トム・クルーズ主演の大ヒット作。前作から36年、伝説のパイロットが帰ってくる。"
category: "映画"
genre: "アクション"
releaseYear: 2022
rating: 4.9
thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800"
vodServices:
  - name: "Netflix"
    url: "https://www.netflix.com"
    available: false
  - name: "Amazon Prime Video"
    url: "https://www.amazon.co.jp/gp/video"
    available: true
  - name: "U-NEXT"
    url: "https://video.unext.jp"
    available: true
tags:
  - "アクション"
  - "戦闘機"
  - "洋画"
publishedAt: "2024-03-22"
---
```

**各項目の説明:**

- `title`: 作品タイトル（日本語OK）
- `description`: 簡潔な説明（120文字以内、SEO重要）
- `category`: カテゴリ（映画/ドラマ/アニメ/ライブ/スポーツ）
- `genre`: ジャンル（フォルダ名と一致させる）
- `releaseYear`: 公開年（数字）
- `rating`: 評価（0.0〜5.0、小数点1桁）
- `thumbnail`: サムネイル画像のURL（Unsplash等を使用）
- `vodServices`: VODサービス一覧
  - `name`: サービス名
  - `url`: サービスのURL
  - `available`: 配信中かどうか（true/false）
- `tags`: タグ（配列形式、好きなだけ追加可能）
- `publishedAt`: 投稿日（YYYY-MM-DD形式）

### Step 5: 本文を書く

メタデータの下（2つ目の `---` の後）に本文を書きます。

```markdown
## あらすじ

アメリカ海軍のトップパイロット、ピート・"マーヴェリック"・ミッチェル。彼は30年以上も現役パイロットとして活躍し続けていたが、かつての教え子たちを訓練する教官として呼び戻される。そこには、かつての相棒グースの息子、ブラッドリー・"ルースター"・ブラッドショウの姿もあった。

## おすすめポイント

### 圧倒的な映像美

IMAXカメラで撮影された戦闘機のシーンは、まさに圧巻。実際に俳優たちがF/A-18に搭乗し、時速1,190kmのスピードを体験しています。

### 感動のストーリー

前作から36年の時を経て、マーヴェリックは何を学び、どう成長したのか。父を亡くしたルースターとの関係性も見どころです。

### 往年のファンも新規ファンも楽しめる

前作を知らなくても十分楽しめる作りになっています。もちろん、前作を観てから見ると、感動は倍増です。

## こんな人におすすめ

- アクション映画が好きな人
- 戦闘機や飛行機が好きな人
- トム・クルーズのファン
- 前作『トップガン』を観た人
- 爽快感のある映画を観たい人
```

### Step 6: Markdownの書き方

#### 見出し

```markdown
## 大見出し（H2）
### 中見出し（H3）
#### 小見出し（H4）
```

#### 強調

```markdown
**太字で強調**
*イタリック体*
```

#### リスト

```markdown
- 項目1
- 項目2
- 項目3

1. 番号付きリスト1
2. 番号付きリスト2
3. 番号付きリスト3
```

#### リンク

```markdown
[リンクのテキスト](https://example.com)
```

例:
```markdown
[Amazon Prime Videoで視聴](https://www.amazon.co.jp/gp/video)
```

#### 引用

```markdown
> これは引用文です。
```

#### 画像

```markdown
![画像の説明](https://example.com/image.jpg)
```

### Step 7: サムネイル画像の探し方

**Unsplash（無料、商用利用OK）**

1. https://unsplash.com/ にアクセス
2. 作品名やキーワードで検索（英語推奨: "action movie", "aircraft" など）
3. 気に入った画像をクリック
4. 右上の「Download free」→「Small」を選択
5. 画像URLをコピーして `thumbnail` に貼り付け

**注意:**
- 著作権に注意（公式ポスター等は使用不可）
- Unsplashは商用利用OKなので安心

### Step 8: プレビュー確認

#### VS Codeの場合

1. Markdownファイルを開く
2. 右上の「プレビューを開く」アイコンをクリック
3. 左右分割でプレビュー表示

#### 開発サーバーで確認

```bash
npm run dev
```

http://localhost:3000 でサイトを開いて、記事を確認します。

### Step 9: 保存とコミット

#### 保存

エディタで `Ctrl+S`（Windows）または `Cmd+S`（Mac）

#### Gitコミット

ターミナルで以下のコマンドを実行:

```bash
# 変更をステージング
git add .

# コミット
git commit -m "feat: トップガン マーヴェリックの記事を追加"

# リモートにプッシュ（初回はsaburoに確認）
git push origin main
```

## よくある質問

### Q1. どのくらいの文量が適切？

**A:** 1記事あたり1,000〜2,000文字が目安です。
- あらすじ: 100〜200文字
- おすすめポイント: 600〜1,000文字（3〜5個）
- こんな人におすすめ: 100〜200文字

### Q2. VODサービスの配信状況はどうやって調べる？

**A:** 各サービスの公式サイトで検索してください。
- Netflix: https://www.netflix.com/
- Amazon Prime Video: https://www.amazon.co.jp/gp/video
- U-NEXT: https://video.unext.jp/
- Hulu: https://www.hulu.jp/
- Disney+: https://www.disneyplus.com/ja-jp

### Q3. 画像が表示されない

**A:** 以下を確認してください:
- thumbnail URLが正しいか
- HTTPSで始まっているか（HTTPは不可）
- 画像が存在するか（ブラウザで開いて確認）

### Q4. ビルドエラーが出た

**A:** 以下を確認してください:
- メタデータ（Front Matter）の形式が正しいか
- インデント（字下げ）が正しいか
- 引用符（`"`）が閉じているか
- カテゴリ/ジャンルがフォルダ名と一致しているか

### Q5. 記事が公開されない

**A:** 以下を確認してください:
1. Gitコミット＆プッシュしたか
2. Vercelデプロイが成功したか
3. ファイル名が `_` で始まっていないか（`_template.md`は除外される）

## おすすめ作業フロー

1. **週末に5〜10記事分の作品をリストアップ**
2. **平日の隙間時間に1記事ずつ書く（1記事30分〜1時間）**
3. **書いた記事をその日のうちにコミット**
4. **週末にまとめてプッシュ**

## サポート

質問があれば、Discordの #project-vod-site-minori チャンネルで saburo にメンションしてください。

Happy Writing! 📝

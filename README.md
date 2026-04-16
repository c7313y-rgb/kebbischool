# 学研 Kebbi情報ラボ デモアプリ

Kebbiらしい親しみやすさと先進感、Edutexの教育実装イメージを掛け合わせた、先生用テキスト × 生徒用ワークブック運用デモです。GitHub Pages にそのまま公開できる静的構成です。

## 主な機能
- 先生モード
  - 本時テキストの確認
  - 生徒ごとの進行率、平均点、得意・苦手の可視化
  - フォロー優先度のダッシュボード表示
  - 次回授業と指導観点の確認
- 生徒モード
  - 24回のカリキュラム受講
  - ミニテスト、復習、予習
  - 苦手領域のサポート表示
  - LocalStorage への進捗保存

## デモアカウント
- teacher / demo123
- student1 / demo123
- student2 / demo123

## ファイル構成
- `index.html` : 画面本体
- `styles.css` : Kebbiカラーに寄せたUIスタイル
- `app.js` : デモロジック
- `assets/` : 未来感のあるローカルSVGビジュアル群

## GitHub Pages 公開手順
1. このフォルダ一式を GitHub リポジトリのルートにアップロードします。
2. リポジトリ名は任意です。
3. GitHub の `Settings` → `Pages` を開きます。
4. `Build and deployment` の `Source` を `Deploy from a branch` にします。
5. Branch は `main`、Folder は `/ (root)` を選びます。
6. 保存後、数分待つと公開URLが発行されます。

## 補足
- デモデータはブラウザの LocalStorage に保存されます。
- 初期状態に戻したい場合は、画面上の「デモ初期化」を押してください。
- 画像はすべてローカル配置のため、GitHub Pages 上でも外部依存なく表示できます。

# 目次 <!-- omit in toc -->

- [1. 概要](#1-概要)
- [2. 手順](#2-手順)
  - [2.1. ローカルに Hello world プロジェクトを作成する](#21-ローカルに-hello-world-プロジェクトを作成する)
  - [2.2. Deno deploy で Github 上の Hello world プロジェクトをデプロイする](#22-deno-deploy-で-github-上の-hello-world-プロジェクトをデプロイする)
  - [2.3. Github 上のプロジェクトを書き換えると変更が自動反映されることを確認する](#23-github-上のプロジェクトを書き換えると変更が自動反映されることを確認する)

# 1. 概要

- Deno deploy で Github のプロジェクトをデプロイした際の備忘録

# 2. 手順

## 2.1. ローカルに Hello world プロジェクトを作成する

1. deno をインストールする

   - [Installation | Manual | Deno](https://deno.land/manual/getting_started/installation)
   - ローカルの deno のバージョンが古い場合はアップデートする（その方法も Installation に記載あり）

1. 適当なフォルダ（ここでは`deno-helloworld-sample/`）に以下の構成でファイルを作成する

   - VSCode を使用している場合は、`setting.json`も作成すると良い
     - refs: [VSCode で Deno 開発する前の準備 - Zenn](https://zenn.dev/wnr/articles/4a5be900e26e33)

   ```
   deno-helloworld-sample/
     ├ .vscode/
     │ └ settings.json
     └ helloworld.ts
   ```

   ```ts
   // helloworld.ts

   import { serve } from "https://deno.land/std@0.142.0/http/server.ts";

   serve((req: Request) => new Response("Hello World"));
   ```

   ```json
   // settings.json

   {
     "deno.enable": true,
     "deno.lint": true,
     "deno.unstable": true
   }
   ```

1. ターミナルで `deno-helloworld-sample/` に移動し、実行コマンドを入力する

   ```sh
   > cd deno-helloworld-sample

   > deno run --allow-net helloworld.ts
   ```

1. ブラウザで、http://localhost:8000/ を閲覧し、"Hello World" が表示されることを確認する

## 2.2. Deno deploy で Github 上の Hello world プロジェクトをデプロイする

1. GitHub に適当なリポジトリを作成し、push する

   - ここでは GitHub のリポジトリ名も `deno-helloworld-sample` とした
   - 実際のリポジトリ: https://github.com/tgc624/deno-helloworld-sample

1. Deno deploy に Github 認証でサインアップする

1. プロジェクト一覧ページ ( https://dash.deno.com/projects ) に遷移し、右上の "New Project" ボタンをクリックする

1. New Project 画面左上の "Deploy from GitHub repository" パネルのを埋める

   - "Select Github repository"
     - 初回は "Add Github Account" が出るのでクリックする
     - "All repositories", "Only select repositories" はどちらでも良いが、"Only select repositories" の場合は先程作ったリポジトリ (`deno-helloworld-sample`) を含めること
   - "Select production branch" は適当なものを選択する
     - "Automatic", "Github Action" はどちらでも良いが、サンプルなので "Automatic" で良い
     - "Search files" > `helloworld.ts` を選択する
   - "Project name" は、デフォルトでリポジトリ名が入力されるが、リポジトリ名によっては以下のエラーが出るので適当な名前を付ける。`tgc-helloworld-sample` とした
     - なお、ここで付ける名前が URL のサブドメインとなる。あとでも変更できるので気楽につければ良い
     ```
     Names must be between 3 and 24 characters, only contain a-z, 0-9 and -, must not start or end with a hyphen (-), and characters after hyphen (-) shouldn't be 8 or 12 in length.
     ```
   - 終わったら "Link" ボタンをクリックする。デプロイされる

1. ブラウザでデプロイしたサイトにアクセスし、"Hello world" が表示されることを確認する
   - URL は `https://{project_nmae}.deno.dev/`
   - 先のサンプルの場合は https://tgc-helloworld-sample.deno.dev/

## 2.3. Github 上のプロジェクトを書き換えると変更が自動反映されることを確認する

1. ローカルの `helloworld.ts` ファイルを適当に書き換え、リモートにプッシュする

   ```diff
   > git diff
   diff --git a/helloworld.ts b/helloworld.ts
   index c7740ad..0f83eca 100644
   --- a/helloworld.ts
   +++ b/helloworld.ts
   @@ -1,3 +1,3 @@
   import { serve } from "https://deno.land/std@0.142.0/http/server.ts";

   -serve((req: Request) => new Response("Hello World"));
   +serve((req: Request) => new Response("Hello TGC"));
   ```

1. 再度デプロイしたサイトにアクセスし、更新が反映されていることを確認する
   - 先の差分だと "Hello World" -> "Hello TGC" となる

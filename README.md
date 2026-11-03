# workout-app

筋トレの種目・重量・回数を記録するアプリです。(開発中)

## 技術スタック

- フロントエンド:React(Vite)
- バックエンド:Node.js / Express
- データ保存:現在はサーバーのメモリ上(MySQL に移行予定)

## 起動方法

```bash
cd server
npm install
node index.js
```

別のターミナルで:

```bash
cd client
npm install
npm run dev
```

## 設計メモ

### コンポーネント構成

App
├─ WorkoutForm
└─ WorkoutList
   └─ WorkoutItem

### state の置き場所

- workouts: 一覧の表示は WorkoutList、追加は WorkoutForm で行い、追加したら一覧も更新する必要があるので、両方の親である App に配置
- 入力中の値: WorkoutForm 内で完結するためWorkoutForm に配置
- 編集中の値: WorkoutItem 内で完結するため WorkoutItem に配置
- editingId:編集できる行を1行だけにするには、「どの行を編集中か」を全行で共有する必要があるのため、親である App に配置
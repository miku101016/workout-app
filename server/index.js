const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQLの代わりに、Node.jsのメモリ（配列）に筋トレデータを一時保存します
let workoutTodos = [
    { id: 1, menu_name: 'ベンチプレス', weight_kg: 60, reps: 10 },
    { id: 2, menu_name: 'スクワット', weight_kg: 80, reps: 10 }
];

// API①: 筋トレ一覧の取得 (GET)
app.get('/api/workouts', (req, res) => {
    console.log('フロントエンドからデータ要求が来ました！');
    res.json(workoutTodos);
});

// API②: 筋トレの追加 (POST)
app.post('/api/workouts', (req, res) => {
    const newWorkout = {
        id: workoutTodos.length + 1,
        menu_name: req.body.menu_name,
        weight_kg: req.body.weight_kg,
        reps: req.body.reps
    };
    
    workoutTodos.unshift(newWorkout); // 配列の先頭に追加
    console.log('新しいメニューを追加しました:', newWorkout);
    res.json({ message: "追加成功", data: newWorkout });
});

// サーバーをポート5000で起動
app.listen(5000, () => {
    console.log("🚀 Node.jsサーバーがポート5000で起動しました！");
});
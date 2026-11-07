const express = require('express');
const cors = require('cors');
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// メモリ上のデータ
let workoutTodos = [
    { id: 1, menu_name: 'ベンチプレス', weight_kg: 60, reps: 10 },
    { id: 2, menu_name: 'スクワット', weight_kg: 80, reps: 10 }
];

// API①: 一覧取得
app.get('/api/workouts', (req, res) => {
    res.json(workoutTodos);
});

// API②: 筋トレ追加
app.post('/api/workouts', (req, res) => {
    const newWorkout = {
        id: Date.now(),
        menu_name: req.body.menu_name,
        weight_kg: req.body.weight_kg,
        reps: req.body.reps
    };
    workoutTodos.unshift(newWorkout);
    res.json({ message: "追加成功", data: newWorkout });
});

// API③: 削除API
app.delete('/api/workouts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    workoutTodos = workoutTodos.filter(todo => todo.id !== id);
    console.log(`✅ ID: ${id} を削除しました`);
    res.json({ message: "削除成功" });
});

// API④: 更新API (PUT)
app.put('/api/workouts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { menu_name, weight_kg, reps } = req.body;
    
    const index = workoutTodos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        workoutTodos[index] = { id, menu_name, weight_kg, reps };
        console.log(`✅ ID: ${id} を更新しました`);
        res.json({ message: "更新成功" });
    } else {
        res.status(404).json({ message: "データが見つかりません" });
    }
});

// 確認用:DB に問い合わせた結果を返す
app.get("/api/health", async (req, res) => {
  const [rows] = await pool.query("SELECT 1");
  res.json(rows);
});

app.listen(5000, () => {
    console.log("Node.jsサーバーがポート5000で起動中");
});
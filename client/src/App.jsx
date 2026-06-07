import { useState, useEffect } from 'react';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [menuName, setMenuName] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  // ★ 順番を入れ替え：ここで関数を定義してから
  const fetchWorkouts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/workouts');
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error("データ取得失敗:", error);
    }
  };

  // ★ 次に useEffect で呼び出す
  useEffect(() => {
    fetchWorkouts();
  }, []); // 空の配列は「画面表示時に1回だけ実行」の意味

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    if (!menuName) return;

    try {
      await fetch('http://localhost:5000/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menu_name: menuName, weight_kg: weight, reps: reps })
      });
      setMenuName('');
      setWeight('');
      setReps('');
      fetchWorkouts();
    } catch (error) {
      console.error("追加失敗:", error);
    }
  };

  const deleteWorkout = async (id) => {
    try {
      // サーバーの削除APIを叩く（今はまだAPIがないのでエラーになりますが、
      // 削除ボタンを機能させるための骨組みです）
      await fetch(`http://localhost:5000/api/workouts/${id}`, {
        method: 'DELETE',
      });
      fetchWorkouts(); // 削除後にリストを更新
    } catch (error) {
      console.error("削除失敗:", error);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h1 className="text-center mb-4">🏋️‍♂️ 筋トレ ToDo 記録</h1>
      <form onSubmit={handleAddWorkout} className="card p-4 shadow-sm mb-4">
        {/* ... (フォーム部分) */}
        <div className="mb-3">
          <label className="form-label">種目名</label>
          <input type="text" className="form-control" placeholder="例: ベンチプレス" value={menuName} onChange={(e) => setMenuName(e.target.value)} />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">重量 (kg)</label>
            <input type="number" className="form-control" placeholder="60" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className="col">
            <label className="form-label">回数 (reps)</label>
            <input type="number" className="form-control" placeholder="10" value={reps} onChange={(e) => setReps(e.target.value)} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">メニューに追加</button>
      </form>

      <div className="list-group">
        {workouts.map((workout) => (
          <div key={workout.id} className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2 rounded">
            <div>
              <strong style={{ fontSize: '1.2rem' }}>{workout.menu_name}</strong>
              <span className="text-muted ms-3">{workout.weight_kg} kg × {workout.reps} 回</span>
            </div>
            
            {/* ★ 削除ボタンを追加 */}
            <button 
              className="btn btn-outline-danger btn-sm"
              onClick={() => deleteWorkout(workout.id)}
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
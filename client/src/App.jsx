import { useState, useEffect } from 'react';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [menuName, setMenuName] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchWorkouts = async () => {
    const response = await fetch('http://localhost:5000/api/workouts');
    const data = await response.json();
    setWorkouts(data);
  };

  useEffect(() => { fetchWorkouts(); }, []);

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ menu_name: menuName, weight_kg: weight, reps: reps })
    });
    setMenuName(''); setWeight(''); setReps('');
    fetchWorkouts();
  };

  const deleteWorkout = async (id) => {
    await fetch(`http://localhost:5000/api/workouts/${id}`, { method: 'DELETE' });
    fetchWorkouts();
  };

  const updateWorkout = async (id, data) => {
    await fetch(`http://localhost:5000/api/workouts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    setEditingId(null);
    fetchWorkouts();
  };

  return (
    <div className="container-fluid d-flex justify-content-center mt-5">
      <div style={{ width: '100%', maxWidth: '600px' }}>
        
        <h1 className="text-center mb-4">🏋️‍♂️ 筋トレ記録</h1>
        
        {/* フォーム部分 */}
        <form onSubmit={handleAddWorkout} className="card p-4 shadow-sm mb-4">
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

        {/* リスト部分 */}
        <div className="list-group">
          {workouts.map((workout) => (
            <div key={workout.id} className="list-group-item shadow-sm mb-2 rounded">
              {editingId === workout.id ? (
                // 編集モード
                <div className="d-flex align-items-center">
                  <input className="form-control me-2" defaultValue={workout.menu_name} id={`edit-name-${workout.id}`} />
                  <button className="btn btn-success btn-sm me-2" onClick={() => {
                    const newName = document.getElementById(`edit-name-${workout.id}`).value;
                    updateWorkout(workout.id, { menu_name: newName, weight_kg: workout.weight_kg, reps: workout.reps });
                  }}>保存</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>キャンセル</button>
                </div>
              ) : (
                // 通常モード
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{workout.menu_name}</strong>
                    <span className="text-muted ms-3">{workout.weight_kg} kg × {workout.reps} 回</span>
                  </div>
                  <div>
                    <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => setEditingId(workout.id)}>編集</button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => deleteWorkout(workout.id)}>削除</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
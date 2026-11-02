import { useState } from 'react';
export const WorkoutForm = (props) => {
  const { onAdd } = props;
  const [menuName, setMenuName] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  const handleSubmit = async (e) => {
  // ① ページの再読み込みを止める
  e.preventDefault();
  // ② 3つの入力値を渡して onAdd を呼ぶ(完了を待つ)
  await ('http://localhost:5000/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ menu_name: menuName, weight_kg: weight, reps: reps })
    });
  await onAdd({ menu_name: menuName, weight_kg: weight, reps: reps });
  // ③ 入力欄を空に戻す
  setMenuName(''); setWeight(''); setReps('');
};
return (

  <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
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
 );
};
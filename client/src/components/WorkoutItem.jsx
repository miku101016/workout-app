import { useState } from "react";
export const WorkoutItem = (props) => {
  const { workout, editingId, setEditingId, deleteWorkout, updateWorkout } =
    props;
  const [editName, setEditName] = useState(workout.menu_name);
  const [editWeight, setEditWeight] = useState(workout.weight_kg);
  const [editReps, setEditReps] = useState(workout.reps);
  const handleSave = () => {
    if (editName.trim() === "" || editWeight === "" || editReps === "") {
      return;
    }
    const newName = editName;
    const newWeight = editWeight;
    const newReps = editReps;
    updateWorkout(workout.id, {
      menu_name: newName,
      weight_kg: newWeight,
      reps: newReps,
    });
  };
  const handleEdit = () => {
    setEditName(workout.menu_name);
    setEditWeight(workout.weight_kg);
    setEditReps(workout.reps);
    setEditingId(workout.id);
  };
  return (
    <div className="list-group-item shadow-sm mb-2 rounded">
      {editingId === workout.id ? (
        // 編集モード

        <div className="d-flex align-items-center">
          <input
            className="form-control me-2"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            className="form-control me-2"
            type="number"
            value={editWeight}
            onChange={(e) => setEditWeight(e.target.value)}
          />
          <input
            className="form-control me-2"
            type="number"
            value={editReps}
            onChange={(e) => setEditReps(e.target.value)}
          />
          <button className="btn btn-success btn-sm me-2" onClick={handleSave}>
            保存
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setEditingId(null);
            }}
          >
            キャンセル
          </button>
        </div>
      ) : (
        // 通常モード
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>{workout.menu_name}</strong>
            <span className="text-muted ms-3">
              {workout.weight_kg} kg × {workout.reps} 回
            </span>
          </div>
          <div>
            <button
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={handleEdit}
            >
              編集
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => deleteWorkout(workout.id)}
            >
              削除
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

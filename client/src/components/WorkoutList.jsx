export const WorkoutList = (props) => {
  const { editingId, setEditingId, deleteWorkout, updateWorkout, workouts } = props;
  return (
    <div className="list-group">
      {workouts.map((workout) => (
        <div
          key={workout.id}
          className="list-group-item shadow-sm mb-2 rounded"
        >
          {editingId === workout.id ? (
            // 編集モード
            <div className="d-flex align-items-center">
              <input
                className="form-control me-2"
                defaultValue={workout.menu_name}
                id={`edit-name-${workout.id}`}
              />
              <input
                className="form-control me-2"
                defaultValue={workout.weight_kg}
                id={`edit-weight-${workout.id}`}
              />
              <input
                className="form-control me-2"
                defaultValue={workout.reps}
                id={`edit-reps-${workout.id}`}
              />
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => {
                  const newName = document.getElementById(
                    `edit-name-${workout.id}`,
                  ).value;
                  const newWeight = document.getElementById(
                    `edit-weight-${workout.id}`,
                  ).value;
                  const newReps = document.getElementById(
                    `edit-reps-${workout.id}`,
                  ).value;
                  updateWorkout(workout.id, {
                    menu_name: newName,
                    weight_kg: newWeight,
                    reps: newReps,
                  });
                }}
              >
                保存
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setEditingId(null)}
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
                  onClick={() => setEditingId(workout.id)}
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
      ))}
    </div>
  );
};

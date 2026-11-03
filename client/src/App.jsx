import { useEffect, useState } from "react";
import { createWorkout, deleteWorkoutApi, getWorkouts, updateWorkoutApi } from "./api.js";
import { WorkoutForm } from "./components/WorkoutForm";
import { WorkoutList } from "./components/WorkoutList";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchWorkouts = async () => {
    const data = await getWorkouts();
    setWorkouts(data);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleAddWorkout = async (data) => {
    await createWorkout(data);
    fetchWorkouts();
  };

  const deleteWorkout = async (id) => {
    await deleteWorkoutApi(id);
    fetchWorkouts();
  };

  const updateWorkout = async (id, data) => {
    await updateWorkoutApi(id, data);
    setEditingId(null);
    fetchWorkouts();
  };

  return (
    <div className="container-fluid d-flex justify-content-center mt-5">
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <h1>筋トレ記録</h1>
        <WorkoutForm onAdd={handleAddWorkout} />

        {/* リスト部分 */}
        <WorkoutList
          editingId={editingId}
          setEditingId={setEditingId}
          deleteWorkout={deleteWorkout}
          updateWorkout={updateWorkout}
          workouts={workouts}
        />
      </div>
    </div>
  );
}

export default App;

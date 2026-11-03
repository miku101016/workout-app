import { useEffect, useState } from "react";
import { WorkoutForm } from "./components/WorkoutForm";
import { WorkoutList } from "./components/WorkoutList";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchWorkouts = async () => {
    const response = await fetch("http://localhost:5000/api/workouts");
    const data = await response.json();
    setWorkouts(data);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleAddWorkout = async (data) => {
    // e.preventDefault();
    await fetch("http://localhost:5000/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // setMenuName(''); setWeight(''); setReps('');
    fetchWorkouts();
  };

  const deleteWorkout = async (id) => {
    await fetch(`http://localhost:5000/api/workouts/${id}`, {
      method: "DELETE",
    });
    fetchWorkouts();
  };

  const updateWorkout = async (id, data) => {
    await fetch(`http://localhost:5000/api/workouts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
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

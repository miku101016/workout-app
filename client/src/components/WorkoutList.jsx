import { WorkoutItem } from "./WorkoutItem";

export const WorkoutList = (props) => {
  const { editingId, setEditingId, deleteWorkout, updateWorkout, workouts } =
    props;
  return (
    <div className="list-group">
      {workouts.map((workout) => (
        <WorkoutItem
          key={workout.id}
          workout={workout}
          editingId={editingId}
          setEditingId={setEditingId}
          deleteWorkout={deleteWorkout}
          updateWorkout={updateWorkout}
        />
      ))}
    </div>
  );
};

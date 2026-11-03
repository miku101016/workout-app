const API_URL = "http://localhost:5000/api/workouts";

// 一覧を取得する
export const getWorkouts = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// 追加する
export const createWorkout = async (data) => {
  await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
};

// 更新する
export const updateWorkoutApi = async (id, data) => {
  await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
  });
};

// 削除する
export const deleteWorkoutApi = async (id) => {
  await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
};
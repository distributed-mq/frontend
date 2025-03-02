import { useState, useEffect } from "react";

const TOTAL_TASKS = 100;

const TaskPage = () => {
  const [tasks, setTasks] = useState(Array(TOTAL_TASKS).fill("idle")); // 기본값: "idle"

  const addTasks = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/add-tasks", {
        method: "POST",
      });

      if (response.ok) {
        setTasks((prev) => {
          const newTasks = [...prev];
          let added = 0;
          for (let i = 0; i < newTasks.length && added < 10; i++) {
            if (newTasks[i] === "idle") {
              newTasks[i] = "pending";
              added++;
            }
          }
          return newTasks;
        });
      }
    } catch (error) {
      console.error("네트워크 오류:", error);
    }
  };

  // 백엔드에서 처리 상태를 가져오는 Polling (0.5초마다 체크)
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch("http://localhost:8080/api/task-status");
        const data = await response.json(); // 예: { completedIndexes: [3, 7, 15] }

        setTasks((prev) =>
          prev.map((state, index) =>
            data.completedIndexes.includes(index) ? "completed" : state
          )
        );
      } catch (error) {
        console.error("상태 업데이트 오류:", error);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">작업 관리</h1>

      <button
        className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 mb-6"
        onClick={addTasks}
      >
        작업 10개 추가하기
      </button>

      {/* 작업 상태 그리드 (정사각형 크기 축소됨) */}
      <div className="grid grid-cols-10 gap-1 mt-6">
        {tasks.map((state, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-md transition-all duration-500 ${
              state === "idle"
                ? "bg-gray-300"
                : state === "pending"
                ? "bg-blue-500 animate-pulse"
                : "bg-green-500 shadow-md"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
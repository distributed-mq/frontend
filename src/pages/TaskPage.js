import { useState, useEffect } from "react";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [processingTasks, setProcessingTasks] = useState(new Set()); // 🟡 대기 중 작업 목록

  // ✅ 작업 리스트 가져오기
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/tasks/list");
      const data = await response.json();

      if (!data.tasks) throw new Error("Invalid response format");

      setTasks(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // ✅ 작업 추가 요청
  const addTasks = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/tasks/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: 10 }),
      });

      const data = await response.json();
      console.log("✅ 작업 추가 응답:", data);

      setTasks(data.tasks);
    } catch (error) {
      console.error("Error adding tasks:", error);
    }
  };

  // ✅ 박스 렌더링 (대기 중일 때 노란색)
  const renderBoxes = () => {
    return Array.from({ length: 100 }, (_, i) => {
      const taskName = `Task ${i + 1}`;
      const isProcessing = processingTasks.has(taskName);
      const isCompleted = tasks.includes(taskName);

      return (
        <div
          key={i}
          className={`w-8 h-8 border m-1 flex items-center justify-center text-xs
          ${isProcessing ? "bg-yellow-400" : isCompleted ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          {i + 1}
        </div>
      );
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">작업 관리</h1>
      
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 shadow-md hover:bg-blue-700 transition"
        onClick={addTasks}
      >
        작업 10개 추가하기
      </button>

      {/* ✅ 100개의 박스 */}
      <div className="grid grid-cols-10 gap-2">{renderBoxes()}</div>
    </div>
  );
};

export default TaskPage;
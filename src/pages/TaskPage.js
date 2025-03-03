import { useState } from "react";

const TaskPage = () => {
  const [mqTasks, setMqTasks] = useState(50); // 메시지 큐에 있는 작업 개수 (static)
  const [consumerTasks, setConsumerTasks] = useState(50); // Consumer가 처리한 작업 개수 (static)

  const addTask = (count) => {
    setMqTasks((prev) => Math.min(prev + count, 100));
  };

  return (
    <div className="flex flex-row justify-center items-center min-h-screen bg-gray-100 p-6">
      {/* 작업 추가 구역 */}
      <div className="flex flex-col items-center w-1/3 p-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4 underline">작업 추가</h2>
        <button 
          className="bg-blue-500 text-white px-6 py-2 mb-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => addTask(1)}
        >
          작업 1개 추가하기
        </button>
        <button 
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
          onClick={() => addTask(10)}
        >
          작업 10개 추가하기
        </button>
      </div>

      {/* 메시지 큐 상태 */}
      <div className="flex flex-col items-center w-1/3 p-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4 underline">메시지 큐 상태</h2>
        <div className="grid grid-cols-10 gap-2 w-40">
          {[...Array(100)].map((_, i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-sm ${i < mqTasks ? 'bg-blue-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Consumer 상태 */}
      <div className="flex flex-col items-center w-1/3 p-4">
        <h2 className="text-xl font-bold mb-4 underline">Consumer 상태</h2>
        <div className="grid grid-cols-10 gap-2 w-40">
          {[...Array(100)].map((_, i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-sm ${i < consumerTasks ? 'bg-green-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;

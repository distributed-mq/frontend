import { Routes, Route } from "react-router-dom";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TaskPage />} />
    </Routes>
  );
}

export default App;
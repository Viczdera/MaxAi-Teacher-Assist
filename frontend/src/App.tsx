import NavDashboard from "./components/navigation/nav";
import { Routes, Route } from "react-router-dom";
import Classroom from "./screens/classroom/classroom";
function App() {
  return (
    <>
      <NavDashboard />
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="/classroom" element={<Classroom/>} />
      </Routes>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ExamTake from "./components/ExamTake";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <nav className="p-3 bg-light">
        <Link to="/student" className="me-3">👨‍🎓 Estudiante</Link>
        <Link to="/teacher">👩‍🏫 Docente</Link>
      </nav>

      <Routes>
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/exam/:id" element={<ExamTake />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

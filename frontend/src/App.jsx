import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ExamList from "./pages/ExamList";
import ExamDetail from "./pages/ExamDetail";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Exámenes</Link> | <Link to="/results">Resultados</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ExamList />} />
        <Route path="/exams/:id" element={<ExamDetail />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

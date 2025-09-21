import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Container } from "react-bootstrap";

function StudentDashboard() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/exams")
      .then((res) => res.json())
      .then((data) => setExams(data));
  }, []);

  return (
    <Container className="mt-4">
      <h2>📘 Panel de Estudiante</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.id}</td>
              <td>{exam.title}</td>
              <td>
                <Link to={`/student/exam/${exam.id}`}>Rendir examen</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default StudentDashboard;

import { useEffect, useState } from "react";
import { Table, Container, Button, Form } from "react-bootstrap";

function TeacherDashboard() {
  const [exams, setExams] = useState([]);
  const [title, setTitle] = useState("");

  const fetchExams = async () => {
    const res = await fetch("http://localhost:5000/api/exams");
    const data = await res.json();
    setExams(data);
  };

  const createExam = async () => {
    await fetch("http://localhost:5000/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    fetchExams();
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <Container className="mt-4">
      <h2>👩‍🏫 Panel Docente</h2>

      <Form className="d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="Título del examen"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button className="ms-2" onClick={createExam}>
          Crear examen
        </Button>
      </Form>

      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.id}</td>
              <td>{exam.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default TeacherDashboard;

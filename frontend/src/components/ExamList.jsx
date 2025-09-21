import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

function ExamList() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/exams")
      .then((res) => res.json())
      .then((data) => setExams(data));
  }, []);

  return (
    <Container className="mt-4">
      <h2>📋 Lista de Exámenes</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Preguntas</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.id}</td>
              <td>{exam.title}</td>
              <td>
                {exam.questions && exam.questions.length > 0 ? (
                  <ul>
                    {exam.questions.map((q) => (
                      <li key={q.id}>
                        <strong>{q.text}</strong>{" "}
                        {q.type === "choice" && q.optionsJson
                          ? `(Opciones: ${JSON.parse(q.optionsJson).join(", ")})`
                          : ""}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <em>Sin preguntas</em>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ExamList;

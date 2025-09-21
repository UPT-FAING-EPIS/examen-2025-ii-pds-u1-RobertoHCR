import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function ExamList({ exams, role }) {
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          {role === "student" && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {exams.map((exam) => (
          <tr key={exam.id}>
            <td>{exam.id}</td>
            <td>{exam.title}</td>
            {role === "student" && (
              <td>
                <Link to={`/student/exam/${exam.id}`}>Rendir examen</Link>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ExamList;

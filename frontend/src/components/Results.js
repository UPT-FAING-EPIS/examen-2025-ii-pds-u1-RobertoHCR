import { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";

function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("results") || "[]");
    setResults(stored);
  }, []);

  return (
    <Container className="mt-4">
      <h2>📊 Resultados</h2>
      {results.length === 0 ? (
        <p>No hay resultados aún</p>
      ) : (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Examen</th>
              <th>Respuestas</th>
              <th>Puntaje</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td>{r.examTitle}</td>
                <td>{Object.values(r.answers).join(", ")}</td>
                <td>{r.score ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Results;

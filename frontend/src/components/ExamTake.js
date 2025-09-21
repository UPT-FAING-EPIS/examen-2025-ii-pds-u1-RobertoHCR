import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Timer from "./Timer";

function ExamTake() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/exams/${id}`)
      .then((res) => res.json())
      .then((data) => setExam(data));
  }, [id]);

  const handleChange = (qId, value) => {
    setAnswers({ ...answers, [qId]: value });
  };

  const handleSubmit = () => {
    if (!exam) return;

    // Guardar en localStorage como historial de resultados
    const stored = JSON.parse(localStorage.getItem("results") || "[]");
    stored.push({
      examTitle: exam.title,
      answers,
      score: null, // aún no corregimos, lo dejamos pendiente
    });
    localStorage.setItem("results", JSON.stringify(stored));

    alert("Examen enviado ✅");
    navigate("/results"); // redirige a resultados
  };

  if (!exam) return <p>Cargando...</p>;

  return (
    <Container className="mt-4">
      <h2>{exam.title}</h2>
      <Timer duration={60} onFinish={handleSubmit} />

      {exam.questions.map((q) => (
        <div key={q.id} className="mb-3">
          <h5>{q.text}</h5>
          <input
            type="text"
            placeholder="Tu respuesta"
            value={answers[q.id] || ""}
            onChange={(e) => handleChange(q.id, e.target.value)}
            className="form-control"
          />
        </div>
      ))}

      <Button onClick={handleSubmit}>Enviar examen</Button>
    </Container>
  );
}

export default ExamTake;

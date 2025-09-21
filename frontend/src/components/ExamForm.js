import { useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";

function ExamForm() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", type: "open", options: "" }]);
  };

  const handleChangeQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    const payload = {
      title,
      questions: questions.map((q) => ({
        text: q.text,
        type: q.type,
        optionsJson: q.type === "choice" ? JSON.stringify(q.options.split(",")) : null,
        answer: null, // lo dejamos vacío para que el docente lo corrija después
      })),
    };

    await fetch("http://localhost:5000/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Examen creado ✅");
    setTitle("");
    setQuestions([]);
  };

  return (
    <Container className="mt-4">
      <h2>Crear Examen</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Parcial 1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <h4>Preguntas</h4>
        {questions.map((q, index) => (
          <Card className="mb-3 p-3" key={index}>
            <Form.Group>
              <Form.Label>Texto de la pregunta</Form.Label>
              <Form.Control
                type="text"
                value={q.text}
                onChange={(e) => handleChangeQuestion(index, "text", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Tipo</Form.Label>
              <Form.Select
                value={q.type}
                onChange={(e) => handleChangeQuestion(index, "type", e.target.value)}
              >
                <option value="open">Respuesta abierta</option>
                <option value="choice">Opción múltiple</option>
              </Form.Select>
            </Form.Group>

            {q.type === "choice" && (
              <Form.Group className="mt-2">
                <Form.Label>Opciones (separadas por coma)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Rojo,Verde,Azul"
                  value={q.options}
                  onChange={(e) => handleChangeQuestion(index, "options", e.target.value)}
                />
              </Form.Group>
            )}
          </Card>
        ))}

        <Button variant="secondary" onClick={addQuestion} className="me-2">
          ➕ Añadir pregunta
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          💾 Guardar examen
        </Button>
      </Form>
    </Container>
  );
}

export default ExamForm;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExam, submitExam } from "../api";

export default function ExamDetail() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    getExam(id).then(setExam);
  }, [id]);

  const handleSubmit = () => {
    submitExam({
      examId: exam.id,
      userId: "student1", // luego dinámico
      answersJson: JSON.stringify(answers),
    }).then(() => alert("Examen enviado!"));
  };

  if (!exam) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{exam.title}</h2>

      {exam.questions && exam.questions.length > 0 ? (
        exam.questions.map((q) => (
          <div key={q.id} style={{ marginBottom: "1rem" }}>
            <p><b>{q.text}</b></p>

            {q.type === "choice" && q.optionsJson ? (
              // si es de opción múltiple
              JSON.parse(q.optionsJson).map((opt, i) => (
                <label key={i} style={{ display: "block" }}>
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={opt}
                    onChange={(e) =>
                      setAnswers({ ...answers, [q.id]: e.target.value })
                    }
                  />{" "}
                  {opt}
                </label>
              ))
            ) : (
              // si es de respuesta abierta
              <input
                type="text"
                placeholder="Tu respuesta"
                onChange={(e) =>
                  setAnswers({ ...answers, [q.id]: e.target.value })
                }
              />
            )}
          </div>
        ))
      ) : (
        <p>⚠ Este examen aún no tiene preguntas</p>
      )}

      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}

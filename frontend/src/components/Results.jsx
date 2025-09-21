import React, { useEffect, useState } from "react";
import { getResults } from "../api";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults("student1").then(setResults);
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>📊 Mis resultados</h2>

      {results.length === 0 ? (
        <p>No tienes resultados aún.</p>
      ) : (
        results.map((r) => (
          <div
            key={r.id}
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <h4>Examen {r.examId}</h4>
            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(r.submittedAt).toLocaleString()}
            </p>

            {r.answersJson && (
              <div>
                <strong>Respuestas:</strong>
                <ul>
                  {Object.entries(JSON.parse(r.answersJson)).map(
                    ([qId, ans], idx) => (
                      <li key={idx}>
                        Pregunta {qId}: <em>{ans}</em>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

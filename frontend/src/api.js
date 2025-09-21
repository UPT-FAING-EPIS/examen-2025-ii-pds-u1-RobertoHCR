const API_URL = "http://localhost:5000/api"; // 👈 cámbialo en deploy

export async function getExams() {
  const res = await fetch(`${API_URL}/exams`);
  return res.json();
}

export async function getExam(id) {
  const res = await fetch(`${API_URL}/exams/${id}`);
  return res.json();
}

export async function submitExam(submission) {
  const res = await fetch(`${API_URL}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });
  return res.json();
}

export async function getResults(userId) {
  const res = await fetch(`${API_URL}/submissions/results/${userId}`);
  return res.json();
}

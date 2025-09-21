CREATE DATABASE IF NOT EXISTS examdb;
USE examdb;

-- Tabla de exámenes
CREATE TABLE IF NOT EXISTS Exams (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Title VARCHAR(255) NOT NULL
);

-- Tabla de preguntas
CREATE TABLE IF NOT EXISTS Questions (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  ExamId INT NOT NULL,
  Text VARCHAR(500) NOT NULL,
  FOREIGN KEY (ExamId) REFERENCES Exams(Id) ON DELETE CASCADE
);

-- Tabla de envíos (submissions)
CREATE TABLE IF NOT EXISTS Submissions (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  ExamId INT NOT NULL,
  UserId VARCHAR(100) NOT NULL,
  AnswersJson TEXT,
  SubmittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ExamId) REFERENCES Exams(Id) ON DELETE CASCADE
);

-- Datos de prueba
INSERT INTO Exams (Title) VALUES ('Examen de Matemáticas'), ('Examen de Historia');

INSERT INTO Questions (ExamId, Text) VALUES
(1, '¿Cuánto es 2 + 2?'),
(1, '¿Cuál es la raíz cuadrada de 16?'),
(2, '¿Quién descubrió América?'),
(2, '¿En qué año fue la independencia de Perú?');

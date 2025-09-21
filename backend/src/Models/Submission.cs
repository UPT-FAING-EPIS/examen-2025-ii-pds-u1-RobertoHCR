namespace ExamApi.Models;

public class Submission
{
    public int Id { get; set; }
    public int ExamId { get; set; }
    public string UserId { get; set; } = string.Empty;
    public DateTime SubmittedAt { get; set; } = DateTime.Now;

    public string AnswersJson { get; set; } = "{}"; // Diccionario serializado como JSON
}

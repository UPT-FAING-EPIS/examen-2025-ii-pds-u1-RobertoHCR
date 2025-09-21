using System.Text.Json.Serialization;

namespace ExamApi.Models
{
    public class Question
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public string Text { get; set; } = string.Empty;
        public string Type { get; set; } = "multiple";
        public string? OptionsJson { get; set; }
        public string? Answer { get; set; }

        [JsonIgnore] // 👈 evita el ciclo
        public Exam? Exam { get; set; }
    }
}
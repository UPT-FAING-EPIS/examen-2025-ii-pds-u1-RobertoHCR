namespace ExamApi.Models;

public class ExamRepository
{
    private readonly List<Exam> _exams = new();
    private readonly List<Submission> _submissions = new();
    private int _examId = 1;
    private int _submissionId = 1;

    public Exam AddExam(Exam exam)
    {
        exam.Id = _examId++;
        _exams.Add(exam);
        return exam;
    }

    public List<Exam> GetExams() => _exams;

    public Exam? GetExam(int id) => _exams.FirstOrDefault(e => e.Id == id);

    public Submission AddSubmission(Submission sub)
    {
        sub.Id = _submissionId++;
        sub.SubmittedAt = DateTime.Now;
        _submissions.Add(sub);
        return sub;
    }

    public List<Submission> GetResults(string userId) =>
        _submissions.Where(s => s.UserId == userId).ToList();
}

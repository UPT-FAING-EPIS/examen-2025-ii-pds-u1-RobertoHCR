using ExamApi.Models;
using Xunit;

public class ExamTests
{
    [Fact]
    public void CanCreateExam()
    {
        var exam = new Exam { Title = "Test Exam" };
        Assert.Equal("Test Exam", exam.Title);
    }
}

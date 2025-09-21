using ExamApi.Data;
using ExamApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuestionsController : ControllerBase
{
    private readonly ExamDbContext _db;

    public QuestionsController(ExamDbContext db) => _db = db;

    [HttpPost]
    public async Task<ActionResult<Question>> CreateQuestion(Question q)
    {
        _db.Questions.Add(q);
        await _db.SaveChangesAsync();
        return q;
    }

    [HttpGet("{examId}")]
    public async Task<ActionResult<IEnumerable<Question>>> GetQuestions(int examId)
    {
        return await _db.Questions.Where(q => q.ExamId == examId).ToListAsync();
    }
}

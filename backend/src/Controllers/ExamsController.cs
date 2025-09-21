using ExamApi.Data;
using ExamApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExamsController : ControllerBase
{
    private readonly ExamDbContext _db;

    public ExamsController(ExamDbContext db) => _db = db;

    [HttpPost]
    public async Task<ActionResult<Exam>> CreateExam(Exam exam)
    {
        _db.Exams.Add(exam);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetExam), new { id = exam.Id }, exam);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Exam>>> GetExams()
    {
        return await _db.Exams.Include(e => e.Questions).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Exam>> GetExam(int id)
    {
        var exam = await _db.Exams.Include(e => e.Questions)
                                  .FirstOrDefaultAsync(e => e.Id == id);
        return exam is null ? NotFound() : exam;
    }
}

using ExamApi.Data;
using ExamApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubmissionsController : ControllerBase
{
    private readonly ExamDbContext _db;

    public SubmissionsController(ExamDbContext db) => _db = db;

    [HttpPost]
    public async Task<ActionResult<Submission>> Submit(Submission s)
    {
        _db.Submissions.Add(s);
        await _db.SaveChangesAsync();
        return s;
    }

    [HttpGet("results/{userId}")]
    public async Task<ActionResult<IEnumerable<Submission>>> Results(string userId)
    {
        return await _db.Submissions.Where(x => x.UserId == userId).ToListAsync();
    }
}

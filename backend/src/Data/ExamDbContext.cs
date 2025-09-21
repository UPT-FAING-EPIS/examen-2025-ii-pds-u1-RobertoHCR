using ExamApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ExamApi.Data;

public class ExamDbContext : DbContext
{
    public ExamDbContext(DbContextOptions<ExamDbContext> options) : base(options) { }

    public DbSet<Exam> Exams => Set<Exam>();
    public DbSet<Question> Questions => Set<Question>();
    public DbSet<Submission> Submissions => Set<Submission>();
}

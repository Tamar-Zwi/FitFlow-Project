using Microsoft.EntityFrameworkCore;
using GymAPI.Core.Entities;

namespace GymAPI.Data
{
    public class DataContext: DbContext
    {
        public DbSet<Lessons> lessons { get; set; }
        public DbSet<Users> users { get; set; }
        public DbSet<RegisterForLesson> registerForUsers { get; set; }
       
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=GYM_db");
        }

    }
}

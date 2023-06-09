using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        /// <summary>
        /// Activities represents the table name in the database.
        /// </summary>
        public DbSet<Activity> Activities { get; set; }
    }
}

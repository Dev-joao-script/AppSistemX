using Microsoft.EntityFrameworkCore;

namespace SistemX.models
{
    public class Contexto : DbContext
    {
        public DbSet<Colaborador> Colaboradores { get; set; }
        public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes)

        {
            
        }

    }
}
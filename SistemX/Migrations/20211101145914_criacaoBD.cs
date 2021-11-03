using Microsoft.EntityFrameworkCore.Migrations;

namespace SistemX.Migrations
{
    public partial class criacaoBD : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Colaboradores",
                columns: table => new
                {
                    ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CPF = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NOME = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NOME_MAE = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NOME_PAI = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EMAIL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TELEFONE = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NASCIMENTO = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colaboradores", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Colaboradores");
        }
    }
}

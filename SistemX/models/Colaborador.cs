using Microsoft.EntityFrameworkCore;

namespace SistemX.models
{
    public class Colaborador
    {
        public string ID { get; set; }
        public string CPF { get; set; }
        public string NOME { get; set; }
        public string NOME_MAE { get; set; }
        public string NOME_PAI { get; set; }
        public string EMAIL { get; set; }
        public string TELEFONE { get; set; }
        public string NASCIMENTO { get; set; }

    }
}
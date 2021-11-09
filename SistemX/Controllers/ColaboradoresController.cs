using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemX.models;

namespace SistemX.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ColaboradoresController : ControllerBase
    {
        private readonly Contexto _contexto;

        public ColaboradoresController(Contexto contexto)
        {
            _contexto = contexto;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Colaborador>>> GetAllAsync()
        {
            return await _contexto.Colaboradores.ToListAsync();
        }

        [HttpGet("{colaboradorID}")]
        public async Task<ActionResult<Colaborador>> GetAsync(int colaboradorID)
        {
            Colaborador colaborador = await _contexto.Colaboradores.FindAsync(colaboradorID);
            if (colaborador == null)
                return NotFound();
            return colaborador;
        }

        [HttpPost]
        public async Task<ActionResult<Colaborador>> PostAsync(Colaborador colaborador)
        {
            await _contexto.Colaboradores.AddAsync(colaborador);
            await _contexto.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> PutAsync(Colaborador colaborador)
        {
            _contexto.Colaboradores.Update(colaborador);
            await _contexto.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{colaboradorID}")]
        public async Task<ActionResult> DeleteAsync(int colaboradorID)
        {
            Colaborador colaborador = await _contexto.Colaboradores.FindAsync(colaboradorID);
            if (colaborador == null)
                return NotFound();
            _contexto.Remove(colaborador);
            await _contexto.SaveChangesAsync();
            return Ok();
        }
    }


}
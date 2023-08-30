using api.Entities;
using api.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/petshop")]
    public class PetShopController : ControllerBase
    {
        private readonly PetShopsDbContext _context;

        public PetShopController(PetShopsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var petShops = _context.PetShops.ToList();

            return Ok(petShops);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var foundPetShop = _context.PetShops.FirstOrDefault(p => p.Id == id);

            if (foundPetShop == null)
            {
                return NotFound("Nenhum Pet Shop encontrado!");
            }

            return Ok(foundPetShop);
        }

        [HttpPost]
        public IActionResult Create(PetShop petShop)
        {
            if (petShop == null)
            {
                  return BadRequest("Parâmetros inválidos!");
            }

            petShop.Id = Guid.NewGuid();

            _context.PetShops.Add(petShop);

            return CreatedAtAction(nameof(GetById), new { id = petShop.Id }, petShop);
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, PetShop petShopInput)
        {
            var foundPetShop = _context.PetShops.FirstOrDefault(p => p.Id == id);

            if (foundPetShop == null)
            {
                return NotFound();
            }

            foundPetShop.Update(petShopInput.Name, petShopInput.Distance, petShopInput.Price_small_dog_weekday, petShopInput.Price_small_dog_weekend, petShopInput.Price_big_dog_weekday, petShopInput.Price_big_dog_weekend);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var foundPetShop = _context.PetShops.FirstOrDefault(p => p.Id == id);

            if (foundPetShop == null)
            {
                return NotFound("Nenhum Pet Shop encontrado!");
            }

            _context.Delete(id);

            return NoContent();
        }

        [HttpPost("best")]
        public IActionResult BestPetShop(PetShopSelectionCriteria criteria)
        {
            if(criteria == null)
            {
                return BadRequest("Parâmetros inválidos!");
            }

            if(criteria.SmallDogs < 0 || criteria.BigDogs < 0)
            {
                return BadRequest("Quantidade de cães inválida!");
            }

            if(DateTime.Parse(criteria.Date) < DateTime.Now.Date)
            {
                return BadRequest("Data inválida!");
            }

            var dayOfWeek = DateTime.Parse(criteria.Date).DayOfWeek;

            var bestPetShop = _context.PetShops
                .OrderBy(p => CalculateTotalPrice(p, dayOfWeek, criteria.SmallDogs, criteria.BigDogs))
                .ThenBy(p => p.Distance)
                .FirstOrDefault();

            if (bestPetShop == null)
            {
                return NotFound("Nenhum Pet Shop encontrado!");
            }

            var bestPetShopResponse = new BestPetShopResponse
            {
                Name = bestPetShop.Name,
                TotalPrice = Math.Round(CalculateTotalPrice(bestPetShop, dayOfWeek, criteria.SmallDogs, criteria.BigDogs), 2)
            };

            return Ok(bestPetShopResponse);
        }

        public double CalculateTotalPrice(PetShop petShop, DayOfWeek dayOfWeek, int smallDogs, int bigDogs)
        {
            var smallDogPrice = (dayOfWeek == DayOfWeek.Saturday || dayOfWeek == DayOfWeek.Sunday) ?
                               petShop.Price_small_dog_weekend : petShop.Price_small_dog_weekday;

            var bigDogPrice = (dayOfWeek == DayOfWeek.Saturday || dayOfWeek == DayOfWeek.Sunday) ?
                              petShop.Price_big_dog_weekend : petShop.Price_big_dog_weekday;

            return (smallDogs * smallDogPrice) + (bigDogs * bigDogPrice);
        }
    }

    internal class BestPetShopResponse
    {
        public required string Name { get; set; }
        public required double TotalPrice { get; set; }
    }

    public class PetShopSelectionCriteria
    {
        public required string Date { get; set; }
        public int SmallDogs { get; set; }
        public int BigDogs { get; set; }
    }
}
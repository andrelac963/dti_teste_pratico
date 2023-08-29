using api.Model;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetShopController : ControllerBase
    {
        private readonly ILogger<PetShopController> _logger;
        private readonly IPetShopService _petShopService;

        public PetShopController(ILogger<PetShopController> logger, IPetShopService petShopService)
        {
            _logger = logger;
            _petShopService = petShopService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] PetShop petShop)
        {
            var createdPetShop = _petShopService.Create(petShop);
            if(createdPetShop == null)
            {
                return BadRequest("Não foi possível criar o PetShop.");
            }
            return Ok(createdPetShop);
        }

        [HttpGet("getById/{id}")]
        public IActionResult FindById(long id)
        {
            var foundPetShop = _petShopService.FindById(id);
            if (foundPetShop == null)
            {
                return NotFound("Nenhum PetShop encontrado.");
            }
            return Ok(foundPetShop);
        }

        [HttpGet("getAll")]
        public IActionResult FindAll()
        {
            var allPetShops = _petShopService.FindAll();
            return Ok(allPetShops);
        }

        [HttpPut]
        public IActionResult Update([FromBody] PetShop petShop)
        {
            _petShopService.Update(petShop);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            _petShopService.Delete(id);
            return Ok();
        }

        [HttpPost("BestPetShop")]
        public IActionResult BestPetShop([FromBody] PetShopSelectionCriteria criteria)
        {
            var bestPetShop = _petShopService.BestPetShop(criteria.Date, criteria.SmallDogs, criteria.BigDogs);

            if (bestPetShop == null)
            {
                return NotFound("Nenhum PetShop encontrado.");
            }

            return Ok(bestPetShop);
        }
    }

    public class PetShopSelectionCriteria
    {
        public string Date { get; set; }
        public int SmallDogs { get; set; }
        public int BigDogs { get; set; }
    }
}
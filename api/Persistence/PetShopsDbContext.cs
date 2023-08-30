using api.Entities;

namespace api.Persistence
{
    public class PetShopsDbContext
    {
        public List<PetShop> PetShops { get; set; }

        public PetShopsDbContext()
        {
            PetShops = new List<PetShop>();
            InitializePetShops();
        }

        private void InitializePetShops()
        {
            PetShops.Add(new PetShop
            {
                Id = Guid.NewGuid(),
                Name = "Meu Canino Feliz",
                Distance = 2000,
                Price_small_dog_weekday = 20,
                Price_small_dog_weekend = 24,
                Price_big_dog_weekday = 40,
                Price_big_dog_weekend = 48,
            });
            PetShops.Add(new PetShop
            {
                Id = Guid.NewGuid(),
                Name = "Vai Rex",
                Distance = 1700,
                Price_small_dog_weekday = 15,
                Price_small_dog_weekend = 20,
                Price_big_dog_weekday = 30,
                Price_big_dog_weekend = 45,
            });
            PetShops.Add(new PetShop
            {
                Id = Guid.NewGuid(),
                Name = "ChowChawgas",
                Distance = 800,
                Price_small_dog_weekday = 30,
                Price_small_dog_weekend = 45,
                Price_big_dog_weekday = 45,
                Price_big_dog_weekend = 45,
            });
        }

        public void Delete(Guid id)
        {
            var foundPetShop = PetShops.FirstOrDefault(p => p.Id == id);

            if (foundPetShop == null)
            {
                return;
            }

            PetShops.Remove(foundPetShop);
        }
    }
}

using api.Model;

namespace api.Services.Implementations
{
    public class PetShopServiceImplementation : IPetShopService
    {
        private readonly List<PetShop> _petShops = new List<PetShop>();
        private long _nextId = 3;

        public PetShopServiceImplementation()
        {
            InitializePetShops();
        }

        public PetShop Create(PetShop petShop)
        {
            petShop.Id = _nextId++;
            _petShops.Add(petShop);
            return petShop;
        }

        public PetShop FindById(long id)
        {
            return _petShops.FirstOrDefault(p => p.Id == id);
        }

        public List<PetShop> FindAll()
        {
            return _petShops.ToList();
        }

        public PetShop Update(PetShop updatedPetShop)
        {
            var existingPetShop = _petShops.FirstOrDefault(p => p.Id == updatedPetShop.Id);

            if (existingPetShop != null)
            {
                _petShops[_petShops.IndexOf(existingPetShop)] = updatedPetShop;
                return updatedPetShop;
            }
            return null;
        }

        public PetShop Delete(long id)
        {
            var petShopToRemove = _petShops.FirstOrDefault(p => p.Id == id);

            if (petShopToRemove != null)
            {
                _petShops.Remove(petShopToRemove);
                return petShopToRemove;
            }

            return null;
        }

        public BestPetShopResponse BestPetShop(string date, int smallDogs, int bigDogs)
        {
            var dayOfWeek = DateTime.Parse(date).DayOfWeek;

            var bestPetShop = _petShops
                .OrderBy(p => CalculateTotalPrice(p, dayOfWeek, smallDogs, bigDogs))
                .ThenBy(p => p.Distance)
                .FirstOrDefault();

            var bestPetShopResponse = new BestPetShopResponse
            {
                Name = bestPetShop.Name,
                Distance = bestPetShop.Distance,
                TotalPrice = CalculateTotalPrice(bestPetShop, dayOfWeek, smallDogs, bigDogs)
            };

            return bestPetShopResponse;
        }

        public double CalculateTotalPrice(PetShop petShop, DayOfWeek dayOfWeek, int smallDogs, int bigDogs)
        {
            var smallDogPrice = (dayOfWeek == DayOfWeek.Saturday || dayOfWeek == DayOfWeek.Sunday) ?
                               petShop.Price_small_dog_weekend : petShop.Price_small_dog_weekday;

            var bigDogPrice = (dayOfWeek == DayOfWeek.Saturday || dayOfWeek == DayOfWeek.Sunday) ?
                              petShop.Price_big_dog_weekend : petShop.Price_big_dog_weekday;

            return (smallDogs * smallDogPrice) + (bigDogs * bigDogPrice);
        }

        private void InitializePetShops()
        {
            _petShops.AddRange(new List<PetShop>
            {
                new PetShop
                {
                    Id = 0,
                    Name = "Meu Canino Feliz",
                    Distance = 2000,
                    Price_small_dog_weekday = 20,
                    Price_small_dog_weekend = 40,
                    Price_big_dog_weekday = 40,
                    Price_big_dog_weekend = 48
                },
                new PetShop
                {
                    Id = 1,
                    Name = "Vai Rex",
                    Distance = 1700,
                    Price_small_dog_weekday = 15,
                    Price_small_dog_weekend = 20,
                    Price_big_dog_weekday = 50,
                    Price_big_dog_weekend = 55
                },
                new PetShop
                {
                    Id = 2,
                    Name = "ChowChawgas",
                    Distance = 800,
                    Price_small_dog_weekday = 30,
                    Price_small_dog_weekend = 45,
                    Price_big_dog_weekday = 45,
                    Price_big_dog_weekend = 45
                }
            });
        }
    } 
}
using api.Model;

namespace api.Services
{
    public interface IPetShopService
    {
        PetShop Create(PetShop petShop);
        PetShop FindById(long id);
        List<PetShop> FindAll();
        PetShop Update(PetShop petShop);
        PetShop Delete(long id);
        BestPetShopResponse BestPetShop(string date, int smallDogs, int bigDogs);
    }

    
}

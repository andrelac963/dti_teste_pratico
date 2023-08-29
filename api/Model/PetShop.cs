namespace api.Model
{
    public class PetShop
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Distance { get; set; }
        public double Price_small_dog_weekday { get; set; }
        public double Price_small_dog_weekend { get; set; }
        public double Price_big_dog_weekday { get; set; }
        public double Price_big_dog_weekend { get; set; }
    }
}

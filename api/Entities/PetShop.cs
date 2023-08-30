namespace api.Entities
{
    public class PetShop
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public int Distance { get; set; }
        public double Price_small_dog_weekday { get; set; }
        public double Price_small_dog_weekend { get; set; }
        public double Price_big_dog_weekday { get; set; }
        public double Price_big_dog_weekend { get; set; }

        public void Update(string Name, int Distance, double Price_small_dog_weekday, double Price_small_dog_weekend, double Price_big_dog_weekday, double Price_big_dog_weekend)
        {
            this.Name = Name;
            this.Distance = Distance;
            this.Price_small_dog_weekday = Price_small_dog_weekday;
            this.Price_small_dog_weekend = Price_small_dog_weekend;
            this.Price_big_dog_weekday = Price_big_dog_weekday;
            this.Price_big_dog_weekend = Price_big_dog_weekend;
        }
    }
}

namespace GymAPI.Models
{
    public class UserPostModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public int SumLessons { get; set; } = 0;

    }
}

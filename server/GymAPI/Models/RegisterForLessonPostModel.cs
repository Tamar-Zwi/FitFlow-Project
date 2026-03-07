namespace GymAPI.Models
{
    public class RegisterForLessonPostModel
    {
        public UserPostModelToRegister UserPostModelToRegister { get; set; }

        public LessonPostModelToRegister LessonPostModelToRegister { get;set; }
        public DateTime DTimeRegister { get; set; }

    }
}

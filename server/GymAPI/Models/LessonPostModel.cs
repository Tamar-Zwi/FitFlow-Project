namespace GymAPI.Models
{
    public class LessonPostModel
    {
        public string LessonName { get; set; }
        public string TeacherName { get; set; }
        public int MaxUsers { get; set; }
        public DateTime DTime { get; set; }
    }
}

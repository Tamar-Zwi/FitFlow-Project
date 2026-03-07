namespace GymAPI.Core.Entities
{
    public class RegisterForLesson
    {

        //private int id;
        //private int userId;
        //private int lessonId;
        //private DateTime dTimeRegister;
       

        //public RegisterForLesson(int id, int userId, int lessonId,DateTime dTimeRegister)
        //{
        //    this.id = id;
        //    this.userId = userId;
        //    this.lessonId = lessonId;
        //    this.dTimeRegister = dTimeRegister;
        //}

        public int Id { get; set; }
        public int UserId { get; set; }
        public Users User { get; set; }
        public int LessonId { get; set; }
        public Lessons Lesson { get; set; }
        public DateTime DTimeRegister { get; set; }
    }
}

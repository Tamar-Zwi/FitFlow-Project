namespace GymAPI.Core.Entities
{
    public class Lessons
    {
        //private int id;
        //private string lessonName;
        //private string teacherName;
        //private int maxUsers;
        //private int sumUsers;
        //private DateTime dTime;

        //public Lessons(int id, string lessonName, string teacherName, int sumUsers,int maxUsers, DateTime dTime)
        //{
        //    this.id = id;
        //    this.lessonName = lessonName;
        //    this.teacherName = teacherName;
        //    this.sumUsers = sumUsers;
        //    this.maxUsers = maxUsers;
        //    this.dTime = dTime;
        //}

        public int Id { get; set; }
        public string LessonName { get; set; }
        public string TeacherName { get; set; }
        public int SumUsers { get; set; }
        public int MaxUsers { get; set; }

        public DateTime DTime { get; set; }
    }
}

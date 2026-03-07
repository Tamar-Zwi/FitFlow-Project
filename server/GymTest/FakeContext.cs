//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using GymAPI;
//using GymAPI.Entities;

//namespace GymTest
//{
//    public class FakeContext:IDataContext
//    {
//        public List<Lessons> lessons { get; set; }
//        public List<Users> users { get; set; }
//        public List<RegisterForLesson> registerForUsers { get; set; }
//        public FakeContext()
//        {
//            lessons = new List<Lessons> { new Lessons { Id = 12, LessonName = "yoga", TeacherName = "chani", DTime = new DateTime(2025, 5, 8), MaxUsers = 20, SumUsers = 10 } };
//            users = new List<Users> { new Users { Id = 13, Name = "sari", Email = "adi@gmail.com", Password = "567", Phone = "0541236988", SumLessons = 10 } };
//            registerForUsers = new List<RegisterForLesson> { new RegisterForLesson { Id = 14, LessonId = 12, DTimeRegister = new DateTime(2025, 5, 8), UserId = 12 } };
//        }
//    }
//}

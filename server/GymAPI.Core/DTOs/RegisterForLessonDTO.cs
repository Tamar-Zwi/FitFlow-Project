using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymAPI.Core.DTOs
{
    public class RegisterForLessonDTO
    {
        public UserToRegisterDTO UserPostModelToRegister { get; set; }

        public LessonToRegisterDTO LessonPostModelToRegister { get; set; }
        public DateTime DTimeRegister { get; set; }
    }
}

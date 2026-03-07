using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymAPI.Core.DTOs
{
    public class LessonDTO
    {
        public string LessonName { get; set; }
        public string TeacherName { get; set; }
        public DateTime DTime { get; set; }
    }
}

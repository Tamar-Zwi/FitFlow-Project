using AutoMapper;
using GymAPI.Core.DTOs;
using GymAPI.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymAPI.Core
{
    public class MappingProfile:Profile
    {
        public MappingProfile() 
        {
            CreateMap<Users,UserDTO>().ReverseMap();
            CreateMap<Lessons,LessonDTO>().ReverseMap();
            CreateMap<RegisterForLesson,RegisterForLessonDTO>().ReverseMap();
        }
    }
}

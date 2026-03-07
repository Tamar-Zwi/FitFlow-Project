using GymAPI.Core.Entities;
using GymAPI.Core.Repositories;
using GymAPI.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymAPI.Service
{
    public class LessonService : ILessonService
    {
        private readonly ILessonRepository _lessonRepository;

        public LessonService(ILessonRepository lessonRepository)
        {
            _lessonRepository = lessonRepository;
        }

        public async Task<List<Lessons>> GetLessonsAsync()
        {
            return await _lessonRepository.GetLessonsAsync();
            // |חישובים
        }

        public async Task<Lessons> GetLessonsByIdAsync(int id)
        {
            return await _lessonRepository.GetLessonsByIdAsync(id);
        }
        

        public async Task<Lessons> GetLessonsByNameAsync(string name)
        {
            return await _lessonRepository.GetLessonsByNameAsync(name);
        }
        public async Task<Lessons> AddLessonAsync(Lessons lesson)
        {
            var l= _lessonRepository.AddLesson(lesson);
           await _lessonRepository.SaveAsync();
            return l;   
        }
        public async Task<Lessons> UpdateLessonsAsync(int id,Lessons lesson)
        {
            Lessons newl =await _lessonRepository.GetLessonsByIdAsync(id);
            if (newl != null)
            {
                newl.LessonName = lesson.LessonName;
                newl.TeacherName = lesson.TeacherName;
                newl.SumUsers = lesson.SumUsers;
                newl.MaxUsers = lesson.MaxUsers;
                newl.DTime = lesson.DTime;
               await _lessonRepository.SaveAsync();
            }
          
            return newl;
        }
        public async Task DeleteLessonsAsync(int id)
        {
            await _lessonRepository.DeleteLessonsAsync(id);
            await _lessonRepository.SaveAsync();

        }
    }
  
}

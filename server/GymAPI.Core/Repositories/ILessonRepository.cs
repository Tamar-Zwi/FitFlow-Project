using GymAPI.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymAPI.Core.Repositories
{
    public interface ILessonRepository
    {
        public Task<List<Lessons?>> GetLessonsAsync();

        public Task<Lessons?> GetLessonsByIdAsync(int id);
        
        public Task<Lessons?> GetLessonsByNameAsync(string name);


        public Lessons AddLesson(Lessons lesson);

        public Task<Lessons?> UpdateLessonsAsync(int id);

        public Task DeleteLessonsAsync(int id);
        public Task SaveAsync();
     
    }
}

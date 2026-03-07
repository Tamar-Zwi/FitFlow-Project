using GymAPI.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymAPI.Core.Services
{
    public interface IRegisterForLessonService
    {
        public Task<List<RegisterForLesson>> GetRegisterForLessonAsync();

        public Task<RegisterForLesson> GetByIdAsync(int id);
        

        public Task<RegisterForLesson> GetRegisterForLessonByDTimeAsync(DateTime dtime);

        public Task<RegisterForLesson> AddRegisterAsync(RegisterForLesson reg);

        public Task<RegisterForLesson> UpdateRegisterAsync(int id,RegisterForLesson reg);

        public Task DeleteRegisterAsync(int id);
    }
}

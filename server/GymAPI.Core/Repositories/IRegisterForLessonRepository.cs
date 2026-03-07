using GymAPI.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymAPI.Core.Repositories
{
    public interface IRegisterForLessonRepository
    {
        public Task<List<RegisterForLesson?>> GetRegisterForLessonAsync();

        public Task<RegisterForLesson?> GetByIdAsync(int id);
         
         public Task<RegisterForLesson?> GetRegisterForLessonByDTimeAsync(DateTime dtime);

        public RegisterForLesson AddRegister(RegisterForLesson reg);

        public Task<RegisterForLesson?> UpdateRegisterAsync(int id);

        public Task DeleteRegisterAsync(int id);
        public Task SaveAsync();
    }
}

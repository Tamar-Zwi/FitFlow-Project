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
    public class RegisterForLessonService : IRegisterForLessonService
    {
        private readonly IRegisterForLessonRepository _registerForLesson;

        public RegisterForLessonService(IRegisterForLessonRepository registerForLesson)
        {
            _registerForLesson = registerForLesson;
        }

        public async Task<List<RegisterForLesson>> GetRegisterForLessonAsync()
        {
            return await _registerForLesson.GetRegisterForLessonAsync();
       
        }
        
        public async Task<RegisterForLesson> GetByIdAsync(int id)
        {
            return await _registerForLesson.GetByIdAsync(id);
        }

        public async Task<RegisterForLesson> GetRegisterForLessonByDTimeAsync(DateTime dtime)
        {
            return await _registerForLesson.GetRegisterForLessonByDTimeAsync(dtime);
        }

        public async Task<RegisterForLesson> AddRegisterAsync(RegisterForLesson rg)
        {
            if (rg.Lesson.SumUsers < rg.Lesson.MaxUsers)
            { rg.Lesson.SumUsers += 1; }
          var t= _registerForLesson.AddRegister(rg);
           await _registerForLesson.SaveAsync();
         return t;

        }
        public async Task<RegisterForLesson> UpdateRegisterAsync(int id,RegisterForLesson rg)
        {
            var us = await _registerForLesson.GetByIdAsync(rg.Id);
            if (us != null)
            {
                us.User= rg.User;
                us.Lesson = rg.Lesson;
                us.DTimeRegister = rg.DTimeRegister;
                us.User.Phone=rg.User.Phone;
                await _registerForLesson.SaveAsync();
            }

            return rg;
        }
        public async Task DeleteRegisterAsync(int id)
        {

           await _registerForLesson.DeleteRegisterAsync(id);
           await _registerForLesson.SaveAsync();
        }
    }

}

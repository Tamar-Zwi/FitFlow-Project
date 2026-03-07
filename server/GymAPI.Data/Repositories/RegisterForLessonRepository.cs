using GymAPI.Core.Entities;
using GymAPI.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymAPI.Data.Repositories
{
    public class RegisterForLessonRepository : IRegisterForLessonRepository
    {
        private readonly DataContext _context;
        public RegisterForLessonRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<RegisterForLesson>> GetRegisterForLessonAsync()
        {
            return await _context.registerForUsers.ToListAsync();
        }

        public async Task<RegisterForLesson> GetByIdAsync(int id)
        {
            return await _context.registerForUsers.FirstOrDefaultAsync(r => r.Id == id);
        }
        

            public async Task<RegisterForLesson> GetRegisterForLessonByDTimeAsync(DateTime dtime)
        {
            return await _context.registerForUsers.SingleOrDefaultAsync(r => r.DTimeRegister == dtime);
        }
        public RegisterForLesson AddRegister(RegisterForLesson registerForLesson)
        {
            _context.registerForUsers.Add(registerForLesson);
            return registerForLesson;
        }

        public async Task<RegisterForLesson> UpdateRegisterAsync( int id)
        {

            return await _context.registerForUsers.FirstOrDefaultAsync(x => x.Id == id);
            
             

        }
        public async Task DeleteRegisterAsync(int id)
        {
            var us = await _context.registerForUsers.FirstOrDefaultAsync(x => x.Id == id);
             _context.registerForUsers.Remove(us);
        }
        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

    }
}

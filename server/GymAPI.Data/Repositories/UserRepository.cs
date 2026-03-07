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
    public class UserRepository:IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Users>> GetUsersAsync()
        {
            return await _context.users.ToListAsync();
        }

        public async Task<Users> GetByIdAsync(int id)
        {
            return await _context.users.FirstAsync(l => l.Id == id);
        }
        
        public async Task<Users> GetByEmailAsync(string email)
        {
            return await _context.users.SingleOrDefaultAsync(l => l.Email == email);
        }

        public Users AddUser(Users user)
        {
            _context.users.Add(user);
            return user;
        }

        public async Task<Users> UpdateUsersAsync(int id)
        {

            return await _context.users.FirstAsync(x => x.Id == id);

        }
        public async Task DeleteUsersAsync(int id)
        {
           
            _context.users.Remove(await _context.users.FirstAsync(x=> x.Id==id));
        }
        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

    }
}

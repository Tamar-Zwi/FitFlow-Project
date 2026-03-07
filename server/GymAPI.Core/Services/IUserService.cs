using GymAPI.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymAPI.Core.Services
{
    public interface IUserService
    {
        public Task<List<Users>> GetUsersAsync();

        public Task<Users> GetByIdAsync(int id);

        
        public Task<Users> GetByEmailAsync(string email);


        public Task<Users> AddUserAsync(Users user);

        public Task<Users> UpdateUsersAsync(int id,Users users);

        public Task DeleteUsersAsync(int id);
    }
}

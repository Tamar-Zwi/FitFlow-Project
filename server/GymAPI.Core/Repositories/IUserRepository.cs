using GymAPI.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymAPI.Core.Repositories
{
    public interface IUserRepository
    {
        public Task<List<Users>> GetUsersAsync();

        public Task<Users> GetByIdAsync(int id);

        
        public Task<Users?> GetByEmailAsync(string email);


        public Users AddUser(Users user);

        public Task<Users> UpdateUsersAsync(int id);

        public Task DeleteUsersAsync(int id);
        public Task SaveAsync();
    }
}

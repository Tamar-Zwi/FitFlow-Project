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
    public class UserService : IUserService
    {
        private readonly IUserRepository _userService;

        public UserService(IUserRepository userService)
        {
            _userService = userService;
        }

        public async Task<List<Users>> GetUsersAsync()
        {
            return await _userService.GetUsersAsync();
          
        }

        public async Task<Users> GetByIdAsync(int id)
        {
            return await _userService.GetByIdAsync(id);
        }

        public async Task<Users> GetByEmailAsync(string email)
        {
            return await _userService.GetByEmailAsync(email);
        }

        public async Task<Users> AddUserAsync(Users user)
        {
       
            _userService.AddUser(user);
           await _userService.SaveAsync();
            return user;

        }
        public async Task<Users> UpdateUsersAsync(int id,Users user)
        {
            Users newu =await _userService.GetByIdAsync(id);
            if (newu != null)
            {

                newu.Name = user.Name;
                newu.Email = user.Email;
                newu.Password = user.Password;
                newu.SumLessons = user.SumLessons;
                newu.Phone = user.Phone;
               await _userService.SaveAsync();
            }
            return newu;
        }
        public async Task DeleteUsersAsync(int id)
        {
            await _userService.DeleteUsersAsync(id);
            await _userService.SaveAsync();    
        }
    }

}

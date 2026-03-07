using AutoMapper;
using GymAPI.Core.DTOs;
using GymAPI.Core.Entities;
using GymAPI.Core.Services;
using GymAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GymAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UsersController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }


        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<List<UserDTO>> Get()
        {
            var uList = await _userService.GetUsersAsync();
            var uDTOList = _mapper.Map<List<UserDTO>>(uList);
            return uDTOList;
        }


        [Authorize(Roles = "admin,user")]
        //הצגת לקוח לפי id
        // GET api/<UsersController>/5
        [HttpGet("byId/{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var us = await _userService.GetByIdAsync(id);
            var u = _mapper.Map<UserDTO>(us);
            if (us == null)
            {
                return NotFound();
            }
            return Ok(u);
        }

        [Authorize(Roles = "admin,user")]
        [HttpGet("{email}")]
        public async Task<ActionResult> GetEmail(string email)
        {
            var us = await _userService.GetByEmailAsync(email);
            var u = _mapper.Map<UserDTO>(us);
            if (us == null)
            {
                return NotFound();
            }
            return Ok(u);
        }


        [AllowAnonymous]
        //רישום לקוח
        // POST api/<UsersController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserPostModel value)
        {

            var us = await _userService.GetByEmailAsync(value.Email);
            if (us == null)
            {
                var s = new Users { Email = value.Email, Name = value.Name, Password = value.Password, SumLessons = 0, Phone = value.Phone };
                var u = await _userService.AddUserAsync(s);
                return Ok(value);
            }
            return Conflict();
        }


        [Authorize(Roles = "admin,user")]

        //עדכון לקוח
        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Users value)
        {
            var us = await _userService.UpdateUsersAsync(id, value);
            if (us == null)
                return BadRequest();
            return Ok(us);
        }

        [Authorize(Roles = "admin,user")]
        //מחיקת לקוח
        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _userService.DeleteUsersAsync(id);

        }
    }
}

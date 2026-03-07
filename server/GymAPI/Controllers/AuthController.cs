using GymAPI.Core.Entities;
using GymAPI.Core.Services;
using GymAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Student.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public AuthController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserPostModelToRegister loginModel)
        {
            var us = await _userService.GetByEmailAsync(loginModel.Email);
            if (us == null || us.Password != loginModel.Password || us.Name != loginModel.Name)
            {
                return Unauthorized();
            }
            bool flag = (us.Name == _configuration["AdminUser:Name"] && us.Password == _configuration["AdminUser:Password"] && us.Email == _configuration["AdminUser:Email"]);
            string s;
            if (flag)
                s = "admin";
            else
                s = "user";
            var claims = new List<Claim>()
                {
                new Claim(ClaimTypes.Name, us.Name),
                new Claim(ClaimTypes.Email, us.Email),
                new Claim(ClaimTypes.Role, s)

                };
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                    issuer: _configuration["JWT:Issuer"],
                    audience: _configuration["JWT:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(6),
                    signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return Ok(new { Token = tokenString });
        }

    }
}

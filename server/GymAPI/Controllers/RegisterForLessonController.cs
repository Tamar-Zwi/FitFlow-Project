using AutoMapper;
using GymAPI.Core.DTOs;
using GymAPI.Core.Entities;
using GymAPI.Core.Services;
using GymAPI.Models;
using GymAPI.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GymAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterForLessonController : ControllerBase
    {
        private readonly IRegisterForLessonService _registerForLessonService;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly ILessonService _lessonService;


        public RegisterForLessonController(IRegisterForLessonService registerForLessonService, IMapper mapper,ILessonService lessonService,IUserService userService)
        {
            _registerForLessonService = registerForLessonService;
            _mapper = mapper;
            _userService = userService;
            _lessonService = lessonService;
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<List<RegisterForLesson>> Get()
        {
            return await _registerForLessonService.GetRegisterForLessonAsync();
        }


        //[Authorize(Roles = "admin,user")]
        //// GET api/<RegisterForLessonController>/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult> Get(int id)
        //{
        //    var us = await _registerForLessonService.GetByIdAsync(id);
        //    var u = _mapper.Map<RegisterForLessonDTO>(us);
        //    if (us == null)
        //        return NotFound();
        //    return Ok(u);
        //}

        [Authorize(Roles = "admin,user")]
        [HttpGet("re/{dtime}")]
        public async Task<ActionResult> GetRegisterForLessonByDTimeAsync(DateTime dtime)
        {
            RegisterForLesson us = await _registerForLessonService.GetRegisterForLessonByDTimeAsync(dtime);
            var u = _mapper.Map<RegisterForLessonDTO>(us);
            if (us == null)
                return NotFound();
            return Ok(u);
        }

        [Authorize(Roles = "admin,user")]
        // POST api/<RegisterForLessonController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RegisterForLessonPostModel value)
        {
            Users us =await _userService.GetByEmailAsync(value.UserPostModelToRegister.Email);
            Lessons les = await _lessonService.GetLessonsByNameAsync(value.LessonPostModelToRegister.LessonName);
            RegisterForLesson re = new RegisterForLesson { DTimeRegister = value.DTimeRegister, User = us, Lesson = les,LessonId=les.Id,UserId=us.Id };
            if(us == null)
                return NotFound();
            if (les == null)
                return BadRequest();
            if(re!=null)
            {
                var rg = await _registerForLessonService.AddRegisterAsync(re);
                return Ok(rg);
            }
            return Conflict();
        }


        //[Authorize(Roles = "admin")]
        //// PUT api/<RegisterForLessonController>/5
        //[HttpPut("{id}")]
        //public async Task<ActionResult> Put(int id, [FromBody] RegisterForLessonPostModel value)
        //{
        //    var les = new Lessons { LessonName = value.LessonPostModelToRegister.LessonName, TeacherName = value.LessonPostModelToRegister.TeacherName, DTime = value.LessonPostModelToRegister.DTime };
        //    var us = new Users { Name = value.UserPostModelToRegister.Name, Email = value.UserPostModelToRegister.Email, Password = value.UserPostModelToRegister.Password };
        //    var re = new RegisterForLesson { User = us, Lesson = les, DTimeRegister = value.DTimeRegister };
        //    var re1 = _registerForLessonService.GetRegisterForLessonByDTimeAsync(value.DTimeRegister);
        //    if (re1 == null)
        //        return BadRequest();

        //    return Ok(await _registerForLessonService.UpdateRegisterAsync(id, re));

        //}

        //[Authorize(Roles = "admin,user")]
        //// DELETE api/<RegisterForLessonController>/5
        //[HttpDelete("{id}")]
        //public async void Delete(int id)
        //{
        //    await _registerForLessonService.DeleteRegisterAsync(id);

        //}
    }
}

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
    public class LessonsController : ControllerBase
    {
        private readonly ILessonService _lessonService;
        private readonly IMapper _mapper;


        public LessonsController(ILessonService lessonService,IMapper mapper)
        {
            _lessonService = lessonService;
            _mapper = mapper;
        }


    [Authorize(Roles = "admin,user")]
        // GET: api/<LessonsController>
        [HttpGet]
        public async Task<List<LessonDTO>> Get()
        {
            var uList =  await _lessonService.GetLessonsAsync();
            var uDTOList = _mapper.Map<List<LessonDTO>>(uList);
            return uDTOList;

        }

        [Authorize(Roles = "admin,user")]
        // GET api/<LessonsController>/5
        [HttpGet("id/{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var us = await _lessonService.GetLessonsByIdAsync(id);
            var u = _mapper.Map<LessonDTO>(us);
            if (us == null)
            {
                return NotFound();
            }
            return Ok(u);
        }

        [Authorize(Roles = "admin,user")]
        [HttpGet("name/{name}")]
        public async Task<ActionResult> GetLessonsByNameAsync(string name)
        {
            var us = await _lessonService.GetLessonsByNameAsync(name);
            var u = _mapper.Map<LessonDTO>(us);
            if (us == null)
            {
                return NotFound();
            }
            return Ok(u);
        }



        [Authorize(Roles = "admin")]
        // POST api/<LessonsController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] LessonPostModel value)
        {

            var us = await _lessonService.GetLessonsByNameAsync(value.LessonName);
            if (us == null)
            {
                var s = new Lessons { MaxUsers = value.MaxUsers, LessonName = value.LessonName, TeacherName = value.TeacherName, DTime = value.DTime,SumUsers=0};
                var u = await _lessonService.AddLessonAsync(s);
                return Ok(s);
            }
            return Conflict();
        }


        [Authorize(Roles = "admin")]
        // PUT api/<LessonsController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] LessonPostModel value)
        {
            var les=new Lessons { LessonName= value.LessonName,TeacherName=value.TeacherName,DTime=value.DTime,MaxUsers=value.MaxUsers,SumUsers=0 };
            var les1=_lessonService.GetLessonsByNameAsync(value.LessonName);
            if (les1 == null)
                return BadRequest();
            return Ok(await _lessonService.UpdateLessonsAsync(id, les));
        }

        [Authorize(Roles = "admin")]
        // DELETE api/<LessonsController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _lessonService.DeleteLessonsAsync(id);
             return NoContent();
        }
    }
}

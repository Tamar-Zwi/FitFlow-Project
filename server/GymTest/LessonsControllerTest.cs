//using GymAPI.Controllers;
//using GymAPI.Entities;
//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Collections.Generic;
//using Xunit;

//public class LessonsControllerTests
//{
    
//    //[Fact]
//    //public void Get_ReturnsAllLessons()
//    //{
//    //    var controller=new LessonsController();
//    //    var result = controller.Get();

//    //    var okResult = Assert.IsType<List<Lessons>>(result);
//    //    Assert.Equal(1, okResult.Count);
//    //}

//    //[Fact]
//    //public void Get_WithValidId_ReturnsLesson()
//    //{
//    //    var controller = new LessonsController();

//    //    var result = controller.Get(1);

//    //    var okResult = Assert.IsType<OkObjectResult>(result);
//    //    var lesson = Assert.IsType<Lessons>(okResult.Value);
//    //    Assert.Equal(1, lesson.Id);
//    //}

//    //[Fact]
//    //public void Get_WithInvalidId_ReturnsNotFound()
//    //{
//    //    var controller = new LessonsController();

//    //    var result = controller.Get(2);

//    //    Assert.IsType<NotFoundResult>(result);
//    //}

//    //[Fact]
//    //public void Post_WithNewLesson_ReturnsOk()
//    //{
//    //    var newLesson = new Lessons { Id = 2, LessonName = "yoga", TeacherName = "ben", DTime = DateTime.Now, SumUsers = 10, MaxUsers = 30 };
//    //    var controller = new LessonsController();

//    //    var result = controller.Post(newLesson);

//    //    var okResult = Assert.IsType<OkObjectResult>(result);
//    //    Assert.Equal(newLesson, okResult.Value);
//    //}

//    //[Fact]
//    //public void Post_WithExistingLesson_ReturnsConflict()
//    //{
//    //    var existingLesson = new Lessons { Id = 1, LessonName = "pilatis", TeacherName = "adi", DTime = new DateTime(2022, 2, 5), SumUsers = 20, MaxUsers = 50 };
//    //    var controller = new LessonsController();

//    //    var result = controller.Post(existingLesson);

//    //    var contentResult = Assert.IsType<ContentResult>(result);
//    //    Assert.Equal("השיעור כבר קיים", contentResult.Content);
//    //}

//    //[Fact]
//    //public void Put_WithValidId_UpdatesLesson()
//    //{
//    //    var updatedLesson = new Lessons { Id = 1, LessonName = "pilatis updated", TeacherName = "adi updated", DTime = DateTime.Now, SumUsers = 25, MaxUsers = 50 };
//    //    var controller = new LessonsController();

//    //    var result = controller.Put(1, updatedLesson);

//    //    var okResult = Assert.IsType<OkObjectResult>(result);
//    //    var lesson = Assert.IsType<Lessons>(okResult.Value);
//    //    Assert.Equal("pilatis updated", lesson.LessonName);
//    //}

//    //[Fact]
//    //public void Put_WithInvalidId_ReturnsNotFound()
//    //{
//    //    var updatedLesson = new Lessons { Id = 2, LessonName = "new lesson", TeacherName = "new teacher", DTime = DateTime.Now, SumUsers = 5, MaxUsers = 20 };
//    //    var controller = new LessonsController();

//    //    var result = controller.Put(10, updatedLesson);

//    //    Assert.IsType<NotFoundResult>(result);
//    //}

//    //[Fact]
//    //public void Delete_WithValidId_ReturnsNoContent()
//    //{

//    //    var controller = new LessonsController();

//    //    var result = controller.Delete(1);

//    //    Assert.IsType<NoContentResult>(result);
//    //}

//    //[Fact]
//    //public void Delete_WithInvalidId_ReturnsNotFound()
//    //{
//    //    var controller = new LessonsController();

//    //    var result = controller.Delete(2);

//    //    Assert.IsType<NotFoundResult>(result);
//    //}
//}
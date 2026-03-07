//using GymAPI.Controllers;
//using GymAPI.Entities;
//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Collections.Generic;
//using Xunit;

//public class RegisterForLessonControllerTests
//{
//    [Fact]
//    public void Get_ReturnsAllRegistrations()
//    {
//        var controller = new RegisterForLessonController();
//        var result = controller.Get();

//        var okResult = Assert.IsType<List<RegisterForLesson>>(result);
//        Assert.Equal(1, okResult.Count);
//    }

//    [Fact]
//    public void Get_WithValidId_ReturnsRegistration()
//    {
//        var controller = new RegisterForLessonController();
//        var result = controller.Get(1);

//        var okResult = Assert.IsType<OkObjectResult>(result);
//        var registration = Assert.IsType<RegisterForLesson>(okResult.Value);
//        Assert.Equal(1, registration.Id);
//    }

//    [Fact]
//    public void Get_WithInvalidId_ReturnsNotFound()
//    {
//        var controller = new RegisterForLessonController();
//        var result = controller.Get(2);

//        Assert.IsType<NotFoundResult>(result);
//    }

//    [Fact]
//    public void Post_WithNewRegistration_ReturnsOk()
//    {
//        var newRegistration = new RegisterForLesson { Id = 2, UserId = 2, LessonId = 2, DTimeRegister = DateTime.Now };
//        var controller = new RegisterForLessonController();

//        var result = controller.Post(newRegistration);

//        var okResult = Assert.IsType<OkObjectResult>(result);
//        Assert.Equal(newRegistration, okResult.Value);
//    }

//    [Fact]
//    public void Post_WithExistingRegistration_ReturnsConflict()
//    {
//        var existingRegistration = new RegisterForLesson { Id = 1, UserId = 1, LessonId = 1, DTimeRegister = new DateTime(2022, 2, 5) };
//        var controller = new RegisterForLessonController();

//        var result = controller.Post(existingRegistration);

//        var contentResult = Assert.IsType<ContentResult>(result);
//        Assert.Equal("הינך רשום לשיעור כזה", contentResult.Content);
//    }

//    [Fact]
//    public void Put_WithValidId_UpdatesRegistration()
//    {
//        var updatedRegistration = new RegisterForLesson { Id = 1, UserId = 1, LessonId = 1, DTimeRegister = DateTime.Now };
//        var controller = new RegisterForLessonController();

//        var result = controller.Put(1, updatedRegistration);

//        var okResult = Assert.IsType<OkObjectResult>(result);
//        var registration = Assert.IsType<RegisterForLesson>(okResult.Value);
//        Assert.Equal(updatedRegistration.DTimeRegister, registration.DTimeRegister);
//    }

//    [Fact]
//    public void Put_WithInvalidId_ReturnsNotFound()
//    {
//        var updatedRegistration = new RegisterForLesson { Id = 2, UserId = 2, LessonId = 2, DTimeRegister = DateTime.Now };
//        var controller = new RegisterForLessonController();

//        var result = controller.Put(10, updatedRegistration);

//        Assert.IsType<NotFoundResult>(result);
//    }

//    [Fact]
//    public void Delete_WithValidId_ReturnsNoContent()
//    {
//        var controller = new RegisterForLessonController();

//        var result = controller.Delete(1);

//        Assert.IsType<NoContentResult>(result);
//    }

//    [Fact]
//    public void Delete_WithInvalidId_ReturnsNotFound()
//    {
//        var controller = new RegisterForLessonController();

//        var result = controller.Delete(2);

//        Assert.IsType<NotFoundResult>(result);
////    }
//}
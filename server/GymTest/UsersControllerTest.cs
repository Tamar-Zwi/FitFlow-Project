//using GymAPI.Controllers;
//using GymAPI.Entities;
//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace GymTest
//{
//    public class UsersControllerTest
//    {
        //[Fact]
        //public void GetUsers_ReturnList()
        //{
        //    var controller = new UsersController();
        //    var result = controller.Get();
        //    Assert.IsType<List<Users>>(result);
        //}

        //[Fact]
        //public void GetById_ReturnsOk()
        //{
        //    var id =1;
        //    var controller = new UsersController();
        //    var result = controller.Get(id);
        //    var okResult = Assert.IsType<OkObjectResult>(result);
        //    var user = Assert.IsType<Users>(okResult.Value); // Cast to Users
        //    Assert.Equal(id, user.Id); // Assert against user.Id
        //}

        //[Fact]
        //public void Post_WithNewUser_ReturnsOk()
        //{
        //    var newUser = new Users { Id = 2, Name = "John", Email = "john@gmail.com", Password = "abc", Phone = "0542365545", SumLessons = 10 };
        //    var controller = new UsersController();
        //    var result = controller.Post(newUser);

        //    var okResult = Assert.IsType<OkObjectResult>(result);

        //    Assert.Equal(newUser, okResult.Value);
        //}

        //[Fact]
        //public void Post_WithExistingUser_ReturnsConflict()
        //{
        //    var existingUser = new Users { Id = 1, Name = "shani", Email = "sh@gmail.com", Password = "123", Phone = "0542365544", SumLessons = 30 };
        //    var controller = new UsersController();
        //    var result = controller.Post(existingUser);

        //    var contentResult = Assert.IsType<ContentResult>(result);
        //    Assert.Equal("המשתמש כבר קיים", contentResult.Content);
        //}

        //[Fact]
        //public void Put_WithValidId_UpdatesUser()
        //{
        //    var updatedUser = new Users { Id = 1, Name = "Shani Updated", Email = "updated@gmail.com", Password = "1234", Phone = "0542365546", SumLessons = 35 };
        //    var controller = new UsersController();
        //    var result = controller.Put(1, updatedUser);

        //    var okResult = Assert.IsType<OkObjectResult>(result);
        //    var user = Assert.IsType<Users>(okResult.Value);
        //    Assert.Equal("Shani Updated", user.Name);
        //}

        //[Fact]
        //public void Put_WithInvalidId_ReturnsNotFound()
        //{
        //    var updatedUser = new Users { Id = 2, Name = "New User", Email = "new@gmail.com", Password = "nope", Phone = "0542365547", SumLessons = 5 };
        //    var controller = new UsersController();
        //    var result = controller.Put(2, updatedUser);

        //    Assert.IsType<NotFoundResult>(result);
        //}

        //[Fact]
        //public void Delete_WithValidId_ReturnsNoContent()
        //{
        //    var controller = new UsersController();
        //    var result = controller.Delete(1);

        //    Assert.IsType<NoContentResult>(result);
        //    Assert.Empty(UsersController.listUsers); // Ensure the user is deleted
        //}

        //[Fact]
        //public void Delete_WithInvalidId_ReturnsNotFound()
        //{
        //    var controller = new UsersController();
        //    var result = controller.Delete(2);

        //    Assert.IsType<NotFoundResult>(result);
        //}

    //}
//}
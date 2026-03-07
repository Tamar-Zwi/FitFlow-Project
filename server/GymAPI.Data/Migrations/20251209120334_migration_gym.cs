using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class migration_gym : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_registerForUsers_LessonId",
                table: "registerForUsers",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_registerForUsers_UserId",
                table: "registerForUsers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_registerForUsers_lessons_LessonId",
                table: "registerForUsers",
                column: "LessonId",
                principalTable: "lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_registerForUsers_users_UserId",
                table: "registerForUsers",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_registerForUsers_lessons_LessonId",
                table: "registerForUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_registerForUsers_users_UserId",
                table: "registerForUsers");

            migrationBuilder.DropIndex(
                name: "IX_registerForUsers_LessonId",
                table: "registerForUsers");

            migrationBuilder.DropIndex(
                name: "IX_registerForUsers_UserId",
                table: "registerForUsers");
        }
    }
}

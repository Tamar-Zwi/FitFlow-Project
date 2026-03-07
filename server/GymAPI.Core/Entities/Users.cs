namespace GymAPI.Core.Entities
{
    public class Users
    {
        

        //private int id;
        //private string name;
        //private string email;
        //private string password;
        //private string phone;
        //private int sumLessons;

        //public Users(int id,string name,string email,string password,string phone,int sumLessons)
        //{
        //    this.id = id;
        //    this.name = name;
        //    this.email = email;
        //    this.password = password;
        //    this.phone = phone;
        //    this.sumLessons = 0;
        //}

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public int SumLessons { get; set; }

    }
}

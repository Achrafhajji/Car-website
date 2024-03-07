using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Dream_car.Controllers
{
    public class Make_carsController : ApiController
    {
        private readonly string connectionString = "Server=DESKTOP-EQNT9L1\\SQLEXPRESS01;Database=Dream_car;Integrated Security=True;";

        [HttpGet]
        public IHttpActionResult GetMakes()
        {
            string query = "SELECT Name_makecar FROM Car_make";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    List<Make> makes = new List<Make>();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var make = new Make
                            {

                                Name_makecar = (string)reader["Name_makecar"],
                             
                            };

                            makes.Add(make);
                        }
                    }
                    return Ok(makes);
                }
            }
        }

    }
}


public class Make
{


    public string Name_makecar { get; set; }


}

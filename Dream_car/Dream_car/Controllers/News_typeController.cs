using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Dream_car.Controllers
{
    public class News_typeController : ApiController
    {
        private readonly string connectionString = "Server=DESKTOP-EQNT9L1\\SQLEXPRESS01;Database=Dream_car;Integrated Security=True;";

        [HttpGet]

        public IHttpActionResult GetTypeNews()
        {
            try
            {
                string query = "SELECT Name_newstype FROM News_type";
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                   
                       
                        List<Typenews> typesnews = new List<Typenews>();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var typenews = new Typenews
                                {
                                    Name_newstype = (string)reader["Name_newstype"],
                                };

                                typesnews.Add(typenews);
                            }
                        }
                        return Ok(typesnews);
                    }
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                return InternalServerError(ex);
            }
        }
    }
}

public class Typenews
{


    public string Name_newstype { get; set; }


}
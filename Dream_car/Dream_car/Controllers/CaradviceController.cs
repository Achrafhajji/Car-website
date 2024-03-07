using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Dream_car.Controllers
{
    public class CaradviceController : ApiController
    {
        private readonly string connectionString = "Server=DESKTOP-EQNT9L1\\SQLEXPRESS01;Database=Dream_car;Integrated Security=True;";

        [HttpGet]
        public IHttpActionResult GetAdvices()
        {
            string query = "SELECT Title_advice,Resume_advice,Picture_advice,Description_advice FROM Car_advice";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    List<Advice> advices = new List<Advice>();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var advice = new Advice
                            {

                                Title_advice = (string)reader["Title_advice"],
                                Resume_advice = (string)reader["Resume_advice"],
                                Description_advice = (string)reader["Description_advice"],
                                Picture_advice = Convert.ToBase64String((byte[])reader["Picture_advice"])


                            };

                            advices.Add(advice);
                        }
                    }
                    return Ok(advices);
                }
            }
        }
    }
}

public class Advice
{

     
    public string Title_advice { get; set; }
    public string Description_advice { get; set; }
    public string Resume_advice { get; set; }

    public string Picture_advice { get; set; }

    public int Id_admin { get; set; }

   
}
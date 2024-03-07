using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Dream_car.Controllers
{
    public class ConsultersController : ApiController
    {
        private readonly string connectionString = "Server=DESKTOP-EQNT9L1\\SQLEXPRESS01;Database=Dream_car;Integrated Security=True;";

        [HttpGet]

        public IHttpActionResult GetConsulters()
        {
            string query = "SELECT Name_consulter,Surname_consulter,Fonction_consulter,Picture_consulter FROM CONSULTERS";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    List<Consulter> consulters = new List<Consulter>();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var consulter = new Consulter
                            {
                               
                                Name_consulter = (string)reader["Name_consulter"],
                                Surname_consulter = (string)reader["Surname_consulter"],
                                Fonction_consulter = (string)reader["Fonction_consulter"],
                                Picture_consulter = Convert.ToBase64String((byte[])reader["Picture_consulter"])


                            };

                            consulters.Add(consulter);
                        }
                    }
                    return Ok(consulters);
                }
            }

        }
    }
}
public class Consulter
{
    
    public string Name_consulter { get; set; }
    public string Surname_consulter { get; set; }
    public string Fonction_consulter { get; set; }
    public string Picture_consulter { get; set; }
}


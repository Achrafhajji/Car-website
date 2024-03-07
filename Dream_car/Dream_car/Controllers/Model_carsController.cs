using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Web.Http;

namespace Dream_car.Controllers
{
    public class Model_carsController : ApiController
    {
        private readonly string connectionString = "Server=DESKTOP-EQNT9L1\\SQLEXPRESS01;Database=Dream_car;Integrated Security=True;";

        [HttpGet]
        public IHttpActionResult GetModels(string Name_makecar)
        {
            try
            {
                string query = "SELECT Name_modelcar FROM Car_model WHERE Name_makecar = @Name_makecar";
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        // Use parameterized query
                        command.Parameters.AddWithValue("@Name_makecar", Name_makecar);

                        List<Model> models = new List<Model>();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var model = new Model
                                {
                                    Name_modelcar = (string)reader["Name_modelcar"],
                                };

                                models.Add(model);
                            }
                        }
                        return Ok(models);
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

public class Model
{
    public string Name_modelcar { get; set; }
}

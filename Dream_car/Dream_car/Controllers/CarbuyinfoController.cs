using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Web.Http;
namespace Dream_car.Controllers
{
    public class CarbuyinfoController : ApiController
    {
        private readonly string connectionString = "Server=DESKTOP-EQNT9L1\\SQLEXPRESS01;Database=Dream_car;Integrated Security=True;";


        [HttpGet]
        public IHttpActionResult GetCarById(int id)
        {
            string query = "SELECT Vehicule_ID, Vehicule_Make, Vehicule_Model, Vehicule_Year, Vehicule_Horsepower, Vehicule_Kilometrage, Vehicule_FirstHand, Vehicule_DoorsNumber," +
                 " Vehicule_Fuel, Vehicule_Transmission, Vehicule_SellPrice, Vehicule_Pictures, Vehicule_Description, PostingTime, " +
                 " DATEDIFF(MINUTE, PostingTime, GETDATE()) AS TimeDifferenceInMinutes FROM Vehicule WHERE Vehicule_ID = @id";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            var vehicule = new Vehicule
                            {
                                Vehicule_ID = (int)reader["Vehicule_ID"],
                                Vehicule_Make = (string)reader["Vehicule_Make"],
                                Vehicule_Model = (string)reader["Vehicule_Model"],
                                Vehicule_Year = (int)reader["Vehicule_Year"],
                                Vehicule_Horsepower = (int)reader["Vehicule_Horsepower"],
                                Vehicule_Kilometrage = (int)reader["Vehicule_Kilometrage"],
                                Vehicule_FirstHand = (string)reader["Vehicule_FirstHand"],
                                Vehicule_DoorsNumber = (int)reader["Vehicule_DoorsNumber"],
                                Vehicule_Fuel = (string)reader["Vehicule_Fuel"],
                                Vehicule_Transmission = (string)reader["Vehicule_Transmission"],
                                Vehicule_SellPrice = (decimal)reader["Vehicule_SellPrice"],
                                Vehicule_Pictures = Convert.ToBase64String((byte[])reader["Vehicule_Pictures"]),
                                Vehicule_Description = (string)reader["Vehicule_Description"],
                                PostingTime = (DateTime)reader["PostingTime"]
                            };
                            // Calculate the time difference in minutes
                            int timeDifferenceInMinutes = (int)reader["TimeDifferenceInMinutes"];

                            // Convert minutes to hours or days
                            int minutesInHour = 60;
                            int minutesInDay = 1440;
                            int minutesInMonth = 43200; // Average minutes in a month (30 days)

                            if (timeDifferenceInMinutes >= minutesInMonth)
                            {
                                int months = timeDifferenceInMinutes / minutesInMonth;
                                vehicule.TimeDifference = $"{months} {(months == 1 ? "month" : "months")} ago";
                            }
                            else if (timeDifferenceInMinutes >= minutesInDay)
                            {
                                int days = timeDifferenceInMinutes / minutesInDay;
                                vehicule.TimeDifference = $"{days} {(days == 1 ? "day" : "days")} ago";
                            }
                            else if (timeDifferenceInMinutes >= minutesInHour)
                            {
                                int hours = timeDifferenceInMinutes / minutesInHour;
                                vehicule.TimeDifference = $"{hours} {(hours == 1 ? "hour" : "hours")} ago";
                            }
                            else
                            {
                                vehicule.TimeDifference = $"{timeDifferenceInMinutes} {(timeDifferenceInMinutes == 1 ? "minute" : "minutes")} ago";
                            }
                            return Ok(vehicule);
                        }
                        else
                        {
                            return NotFound();
                        }
                    }
                }
            }
        }

    }
}

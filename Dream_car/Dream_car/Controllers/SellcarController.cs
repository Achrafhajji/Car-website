using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Dream_car.Controllers
{
    public class SellcarController : ApiController
    {
        private readonly string connectionString = "Server=DESKTOP-EQNT9L1\\SQLEXPRESS01;Database=Dream_car;Integrated Security=True;";
        [Route("api/Sellcar/Postcar")]
        [HttpPost]
        public IHttpActionResult Postcar()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;

                var vehicule = new Vehicules
                {
                    Vehicule_Make = httpRequest["make"],
                    Vehicule_Model = httpRequest["model"],
                    Vehicule_Year = Convert.ToInt32(httpRequest["year"]),
                    Vehicule_Horsepower = Convert.ToInt32(httpRequest["horsepower"]),
                    Vehicule_Kilometrage = Convert.ToInt32(httpRequest["kilometrage"]),
                    Vehicule_SellPrice = Convert.ToDecimal(httpRequest["sellPrice"]),
                    Vehicule_FirstHand = httpRequest["firsthand"],
                    Vehicule_DoorsNumber = Convert.ToInt32(httpRequest["doorsNumber"]),
                    Vehicule_Fuel = httpRequest["fuel"],
                    Vehicule_Transmission = httpRequest["transmission"],
                    Vehicule_Description = httpRequest["description"],
                    Vehicule_Pictures = new byte[0], // Initialize as an empty byte array
                   PostingTime = DateTime.Now // Set the posting time

                };

                var pictureFile = httpRequest.Files["file0"]; // Make sure it matches the name used in Angular FormData
                if (pictureFile != null && pictureFile.ContentLength > 0)
                {
                    using (BinaryReader reader = new BinaryReader(pictureFile.InputStream))
                    {
                        vehicule.Vehicule_Pictures = reader.ReadBytes(pictureFile.ContentLength);
                    }
                }

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    string query = @"INSERT INTO Vehicule (Vehicule_Make, Vehicule_Model, Vehicule_Year, Vehicule_Horsepower, Vehicule_Kilometrage, Vehicule_FirstHand, Vehicule_DoorsNumber, Vehicule_Fuel, Vehicule_Transmission, Vehicule_SellPrice, Vehicule_Pictures, Vehicule_Description, PostingTime)
                 VALUES (
                     @Make, @Model, @Year, @Horsepower, @Kilometrage, 
                     @FirstHand, @DoorsNumber, @Fuel, @Transmission, 
                     @SellPrice, @Pictures, @Description, @PostingTime
                 )";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Make", vehicule.Vehicule_Make);
                        command.Parameters.AddWithValue("@Model", vehicule.Vehicule_Model);
                        command.Parameters.AddWithValue("@Year", vehicule.Vehicule_Year);
                        command.Parameters.AddWithValue("@Horsepower", vehicule.Vehicule_Horsepower);
                        command.Parameters.AddWithValue("@Kilometrage", vehicule.Vehicule_Kilometrage);
                        command.Parameters.AddWithValue("@FirstHand", vehicule.Vehicule_FirstHand);
                        command.Parameters.AddWithValue("@DoorsNumber", vehicule.Vehicule_DoorsNumber);
                        command.Parameters.AddWithValue("@Fuel", vehicule.Vehicule_Fuel);
                        command.Parameters.AddWithValue("@Transmission", vehicule.Vehicule_Transmission);
                        command.Parameters.AddWithValue("@SellPrice", vehicule.Vehicule_SellPrice);
                        command.Parameters.Add("@Pictures", SqlDbType.VarBinary).Value = vehicule.Vehicule_Pictures;
                        command.Parameters.AddWithValue("@Description", vehicule.Vehicule_Description);
                        command.Parameters.AddWithValue("@PostingTime", vehicule.PostingTime);

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Car added successfully");
                        }
                        else
                        {
                            return BadRequest("Failed to add car");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                Console.WriteLine(ex);
                return InternalServerError(ex);
            }
        }
    }
}


    public partial class Vehicules
    {
        public string Vehicule_Make { get; set; }
        public string Vehicule_Model { get; set; }
        public int Vehicule_Year { get; set; }
    public int Vehicule_Horsepower { get; set; }
    public int Vehicule_Kilometrage { get; set; }
    public decimal Vehicule_SellPrice { get; set; }
    public string Vehicule_FirstHand { get; set; }
        public int Vehicule_DoorsNumber { get; set; }
        public string Vehicule_Fuel { get; set; }
        public string Vehicule_Transmission { get; set; }
        public byte[] Vehicule_Pictures { get; set; }
        public string Vehicule_Description { get; set; }
    public DateTime PostingTime { get; set; }

}


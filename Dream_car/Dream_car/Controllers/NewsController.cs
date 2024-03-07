using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net.Http;
using System.Web.Http;

namespace Dream_car.Controllers
{
    public class NewsController : ApiController
    {
        private readonly string connectionString = "Server=DESKTOP-EQNT9L1\\SQLEXPRESS01;Database=Dream_car;Integrated Security=True;";

        [HttpGet]
        public IHttpActionResult GetNews()
        {
            string query = "SELECT Title_news, Subtitle_news, Description_news, [Pic_news],typenews_news, Name_admin, Surname_admin FROM News, Admin WHERE News.Id_admin = Admin.Id_admin";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    List<News> news = new List<News>();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var newsItem = new News
                            {
                                Title_news = (string)reader["Title_news"],
                                Subtitle_news = (string)reader["Subtitle_news"],
                                Description_news = (string)reader["Description_news"],
                                Pic_news = Convert.ToBase64String((byte[])reader["Pic_news"]),
                                Name_admin = (string)reader["Name_admin"],
                                Surname_admin = (string)reader["Surname_admin"],
                                Typenews_news = (string)reader["Typenews_news"],
                            };

                            news.Add(newsItem);
                        }
                    }
                    return Ok(news);
                }
            }
        }



        public IHttpActionResult GetNewsbytype(string typenews)
        {
            string query = "SELECT Title_news, Subtitle_news, Description_news, [Pic_news],typenews_news, Name_admin, Surname_admin FROM News, Admin WHERE News.Id_admin = Admin.Id_admin and typenews_news=@typenews";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {

                
                    command.Parameters.AddWithValue("@typenews", typenews);
               
                    List<News> news = new List<News>();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var newsItem = new News
                            {
                                Title_news = (string)reader["Title_news"],
                                Subtitle_news = (string)reader["Subtitle_news"],
                                Description_news = (string)reader["Description_news"],
                                Pic_news = Convert.ToBase64String((byte[])reader["Pic_news"]),
                                Name_admin = (string)reader["Name_admin"],
                                Surname_admin = (string)reader["Surname_admin"],
                                Typenews_news = (string)reader["Typenews_news"],
                            };

                            news.Add(newsItem);
                        }
                    }
                           return Ok(news);
                
                    }
            }
        }


    }
}

public partial class News
{
    public string Title_news { get; set; }
    public string Description_news { get; set; }
    public string Pic_news { get; set; }
    public string Name_admin { get; set; }
    public string Surname_admin { get; set; }
    public string Subtitle_news { get; set; }
    public string Typenews_news { get; set; }
}

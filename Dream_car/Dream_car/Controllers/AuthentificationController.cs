using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Web.Security;

namespace Dream_car.Controllers
{
    public class AuthentificationController : ApiController
    {
        private readonly string connectionString = "Server=DESKTOP-EQNT9L1\\SQLEXPRESS01;Database=Dream_car;Integrated Security=True;";
        [Route("api/Authentification/Register")]
        [HttpPost]
        public IHttpActionResult Register([FromBody] User user)
        {
            if (UserExists(user.Email_user, user.Password_user))
            {
                return BadRequest("Email or password already exists");
            }

            user.Password_user = HashPassword(user.Password_user);

            string query = "INSERT INTO Users (Name_user, Surname_user, Phonenumber_user, City_user, Adresse_user, Email_user, Password_user) " +
                            "VALUES (@Name_user, @Surname_user, @Phonenumber_user, @City_user, @Adresse_user, @Email_user, @Password_user)";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Name_user", user.Name_user);
                    command.Parameters.AddWithValue("@Surname_user", user.Surname_user);
                    command.Parameters.AddWithValue("@Phonenumber_user", user.Phonenumber_user);
                    command.Parameters.AddWithValue("@City_user", user.City_user);
                    command.Parameters.AddWithValue("@Adresse_user", user.Adresse_user);
                    command.Parameters.AddWithValue("@Email_user", user.Email_user);
                    command.Parameters.AddWithValue("@Password_user", user.Password_user);

                    try
                    {
                        if (UserExists(user.Email_user, user.Password_user))
                        {
                            return BadRequest("Email or password already exists");
                        }

                        command.ExecuteNonQuery();

                        // Generate JWT token and return it along with user's email
                        var token = GenerateJwtToken(user.Email_user);
                        var userName = GetUsernameByEmail(user.Email_user); // Retrieve the user's name from the database

                        return Ok(new { Token = token, Email = user.Email_user, Message = "Registration successful" });
                    }
                    catch (Exception ex)
                    {
                        return BadRequest($"Registration failed: {ex.Message}");
                    }
                }
            }
        }


        // Helper method to check if email or password already exists
        private bool UserExists(string email, string password)
        {
            string query = "SELECT COUNT(*) FROM Users WHERE Email_user = @Email_user OR Password_user = @Password_user";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Email_user", email);
                    command.Parameters.AddWithValue("@Password_user", password);

                    int count = (int)command.ExecuteScalar();
                    return count > 0;
                }
            }
        }

        private string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));

                // Convert the byte array to a string representation
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < hashedBytes.Length; i++)
                {
                    builder.Append(hashedBytes[i].ToString("x2"));
                }

                return builder.ToString();
            }
        }
        private readonly string secretKey = "Achraf200220022608hajjisalaaljadida"; // Replace with your secret key

        private string GenerateJwtToken(string email)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Email, email) }),
                Expires = DateTime.UtcNow.AddDays(7), // Token expiration time
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        [Route("api/Authentification/Login")]

        [HttpPost]
        public IHttpActionResult Login([FromBody] User user)
        {
            user.Password_user = HashPassword(user.Password_user);

            string query = "SELECT COUNT(*) FROM Users WHERE Email_user = @Email_user AND Password_user = @Password_user";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.Add(new SqlParameter("@Email_user", SqlDbType.NVarChar) { Value = user.Email_user });
                    command.Parameters.Add(new SqlParameter("@Password_user", SqlDbType.NVarChar) { Value = user.Password_user });

                    try
                    {
                        var result = (int)command.ExecuteScalar();

                        if (result > 0)
                        {
                            // Generate JWT token and return it
                            var token = GenerateJwtToken(user.Email_user);
                            var userName = GetUsernameByEmail(user.Email_user); // Retrieve the user's name from the database

                            return Ok(new { Token = token, Message = "Login successful" });
                        }
                        else
                        {
                            return BadRequest("Invalid email or password");
                        }
                    }
                    catch (Exception ex)
                    {
                        return BadRequest($"Login failed: {ex.Message}");
                    }
                }
            }
        }

        // Helper method to get the username by email
        [Route("api/Authentification/GetUsernameByEmail")]
        [HttpGet]
        public string GetUsernameByEmail(string email)
        {
            string query = "SELECT Name_user FROM Users WHERE Email_user = @Email_user";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Email_user", email);
                    return (string)command.ExecuteScalar();
                }
            }
        }
        private bool IsAuthenticated()
        {
            return System.Web.HttpContext.Current.Session["UserId"] != null;
        }




        [Route("api/Authentification/Logout")]
        [HttpPost]
        public IHttpActionResult Logout()
        {
            // You may want to implement additional logic here, such as token revocation or session cleanup.

            // For demonstration purposes, assuming you have a token revocation mechanism:
            // You might have a database table to store revoked tokens or use a cache mechanism.

            // Example (pseudo code):
            // var revokedTokens = GetRevokedTokensFromDatabase(); // Implement this method to fetch revoked tokens
            // var token = GetTokenFromRequest(); // Implement this method to extract the token from the request

            // if (!revokedTokens.Contains(token))
            // {
            //     revokedTokens.Add(token);
            //     SaveRevokedTokensToDatabase(revokedTokens); // Implement this method to save revoked tokens
            // }

            // For demonstration purposes, assuming you're using a cookie-based authentication:
            // HttpContext.Current.Session.Abandon(); // Uncomment this line if you're using ASP.NET Session
            FormsAuthentication.SignOut(); // Clear the authentication cookie

            return Ok("Logout successful");
        }


    }
}


public class User
{
    public string Name_user { get; set; }
    public string Surname_user { get; set; }
    public string Phonenumber_user { get; set; }
    public string City_user { get; set; }
    public string Adresse_user { get; set; }
    public string Email_user { get; set; }
    public string Password_user { get; set; }
}


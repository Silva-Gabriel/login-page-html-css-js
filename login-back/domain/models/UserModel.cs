
using System.ComponentModel.DataAnnotations;

namespace domain.models
{
    public class UserModel
    {
        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }
        
        [Required(ErrorMessage = "Cpf is required")]
        [RegularExpression(@"^\d{3}\.\d{3}\.\d{3}-\d{2}$", ErrorMessage = "Invalid Cpf format. Expected format: xxx.xxx.xxx-xx")]
        public string? Cpf { get; set; }

        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Phone is required")]
        public string? User { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        [StringLength(100, ErrorMessage = "Password must be at least {2} characters long.", MinimumLength = 8)]
        public string? Password { get; set; }
    }
}
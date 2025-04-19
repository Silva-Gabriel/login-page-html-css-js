using application.User.Create;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace api.src.controllers
{
    [ApiController]
    [Route("v1/users")]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        
        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [HttpGet]
        public IActionResult GetUserInfo()
        {
            var userInfo = new
            {
                Id = 1,
                Name = "John Doe",
                Email = "john.Doe@email.com"
            };

            return Ok(userInfo);
        }


        [HttpPost]
        public async Task<IActionResult> Register([FromBody] CreateUserRequest request)
        {
            var result = await _mediator.Send(request);
            return Ok(result);
        }
    }
}
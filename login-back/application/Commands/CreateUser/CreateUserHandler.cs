using MediatR;

namespace application.User.Create
{
    public class CreateUserHandler : IRequestHandler<CreateUserRequest, CreateUserResponse>
    {
        // private readonly IUnitOfWork _unitOfWork;
        // private readonly IMapper _mapper;
        // private readonly IPasswordHasher _passwordHasher;
        public Task<CreateUserResponse> Handle(CreateUserRequest request, CancellationToken cancellationToken)
        {
            var response = new CreateUserResponse
            {
                Id = 1
            };

            return Task.FromResult(response);
        }
    }
}
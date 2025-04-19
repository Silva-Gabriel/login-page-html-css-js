using domain.models;
using MediatR;

namespace application.User.Create
{
    public class CreateUserRequest : UserModel, IRequest<CreateUserResponse>
    {
    
    }
}
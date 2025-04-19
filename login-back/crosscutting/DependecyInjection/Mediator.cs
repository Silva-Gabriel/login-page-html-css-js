using Microsoft.Extensions.DependencyInjection;

namespace crosscutting.DependecyInjection
{
    public static class Mediator
    {
        public static IServiceCollection AddMediator(this IServiceCollection services)
        {
            var assembly = AppDomain.CurrentDomain.Load("application");
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(assembly));
            
            return services;
        }
    }
}
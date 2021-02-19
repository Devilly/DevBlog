using System;
using System.Net.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace DevBlogFrontend
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            // https://docs.microsoft.com/en-us/aspnet/core/blazor/debug?view=aspnetcore-5.0&tabs=visual-studio#breakpoints-in-oninitializedasync-not-hit
#if DEBUG

            // await Task.Delay(5000);

#endif

            foreach (Type type in typeof(Program).Assembly.DefinedTypes)
            {
                Console.WriteLine(type.FullName);
            }

            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");

            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

            await builder.Build().RunAsync();
        }
    }
}

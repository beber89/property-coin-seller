using System;
using System.Net.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using Nethereum.Web3;

namespace blazor_app
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("app");

            builder.Services.AddTransient(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

            // ---- Ethereum code -----
            builder.Services.AddSingleton<Web3>(sp => new Web3("https://rinkeby.infura.io/v3/aaa6614b170b4067b7b1cd2f616bda18"));
            // ------------------------
            await builder.Build().RunAsync();
        }
    }
}

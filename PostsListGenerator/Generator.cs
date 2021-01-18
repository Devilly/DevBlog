using Microsoft.CodeAnalysis;
using System.Text;
using System.Diagnostics;

namespace PostsListGenerator
{
    [Generator]
    public class Generator : ISourceGenerator
    {
        public void Initialize(GeneratorInitializationContext context)
        {
            // API doc
            // https://docs.microsoft.com/en-us/dotnet/api/system.diagnostics.debugger.launch?view=net-5.0

            // Only works with the Just-In-Time debugger installed in VS.
            // https://docs.microsoft.com/en-us/visualstudio/debugger/debug-using-the-just-in-time-debugger?view=vs-2019
            
            // Debugger.Launch();
        }

        public void Execute(GeneratorExecutionContext context)
        {
            StringBuilder builder = new StringBuilder(@"
                using System.Collections.Immutable;

                namespace DevBlogFrontend {
                    public partial class Blog {

                        public static ImmutableList<string> Posts { get; }

                        static Blog() {
                            ImmutableList<string> temp = ImmutableList.Create<string>();
                ");            
            
            foreach(AdditionalText entry in context.AdditionalFiles) {
                builder.Append($@"
                            temp = temp.Add(@""{entry.Path}"");
                ");
            }

            builder.Append(@"
                            Posts = temp;
                        }
                    }
                }
            ");
            
            string partialBlogClass = builder.ToString();
            context.AddSource("Blog.Generated.cs", partialBlogClass);
        }
    }
}

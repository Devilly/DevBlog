using Microsoft.CodeAnalysis;
using System.Text;
using System.IO;
using System.Text.Json;
using System.Dynamic;

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
                using System;
                using System.Collections.Immutable;

                namespace DevBlogFrontend.Domain {
                    public partial class Blog {

                        public static ImmutableList<Post> Posts { get; }

                        static Blog() {
                            ImmutableList<Post> temp = ImmutableList.Create<Post>();
                ");            

            foreach(AdditionalText entry in context.AdditionalFiles) {
                string postPath = Path.TrimEndingDirectorySeparator(Path.GetRelativePath("wwwroot/posts", entry.Path).Replace("_meta.json", ""));

                string text = entry.GetText(context.CancellationToken).ToString();
                dynamic json = JsonSerializer.Deserialize<ExpandoObject>(text);

                builder.Append($@"
                            temp = temp.Add(new Post() {{
                                Path = $@""{postPath}"",
                                Title = ""{json.title}"",
                                Date = DateTime.Parse(""{json.date}"")
                            }});
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

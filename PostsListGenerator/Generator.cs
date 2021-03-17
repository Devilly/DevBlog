using Microsoft.CodeAnalysis;
using System.Text;
using System.IO;
using System.Text.Json;
using System.Dynamic;
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
                using System;
                using System.Collections.Immutable;

                namespace DevBlogFrontend.Domain {
                    public partial class Blog {

                        public static ImmutableList<Post> Posts { get; }

                        static Blog() {
                            ImmutableList<Post> temp = ImmutableList.Create<Post>();
                            ImmutableList<string> tempTags = ImmutableList.Create<string>();
                ");

            foreach (AdditionalText entry in context.AdditionalFiles)
            {
                string postPath = entry.Path.Split(Path.DirectorySeparatorChar)[^2];

                string text = entry.GetText(context.CancellationToken).ToString();
                dynamic json = JsonSerializer.Deserialize<ExpandoObject>(text);

                foreach (JsonElement tag in json.tags.EnumerateArray())
                {
                    builder.Append($@"
                            tempTags = tempTags.Add(""{tag.GetString()}"");
                    ");
                }

                builder.Append($@"
                            temp = temp.Add(new Post() {{
                                Path = $@""{postPath}"",
                                Title = ""{json.title.GetString()}"",
                                Date = DateTime.Parse(""{json.date.GetString()}""),
                                Tags = tempTags
                            }});

                            tempTags = tempTags.Clear();
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

using System;

namespace DevBlogFrontend.Domain {
    public record Post {
        	public string Path { get; init; }
            public string Title { get; init; }
            public DateTime Date { get; init; }
    }
}
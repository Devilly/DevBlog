using System;
using System.Collections.Immutable;

namespace DevBlogFrontend.Domain
{
    public record Post : IComparable<Post>
    {
        public string Path { get; init; }
        public string Title { get; init; }
        public DateTime Date { get; init; }

        public ImmutableList<string> Tags { get; init; }

        public int CompareTo(Post otherPost)
        {
            return otherPost.Date.CompareTo(this.Date);
        }
    }
}
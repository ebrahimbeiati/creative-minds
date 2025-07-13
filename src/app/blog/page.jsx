import PostCard from "@/components/postCard/postCard";
import { getPosts } from "@/lib/data";
import { Search, Filter, AlertCircle } from "lucide-react";

// Sample data for when database is not available
const samplePosts = [
  {
    id: "1",
    title: "Welcome to Creative Minds",
    desc: "This is your first blog post. Start sharing your thoughts, ideas, and stories with the world. Our platform is designed to help creators like you connect with your audience and build meaningful content.",
    img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "welcome-to-creative-minds",
    createdAt: new Date().toISOString(),
    userId: "sample-user"
  },
  {
    id: "2",
    title: "The Art of Creative Writing",
    desc: "Discover the secrets of compelling storytelling and learn how to craft engaging content that resonates with your readers. From brainstorming ideas to polishing your final draft, we'll cover everything you need to know.",
    img: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "art-of-creative-writing",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    userId: "sample-user"
  },
  {
    id: "3",
    title: "Building Your Online Presence",
    desc: "Learn how to establish a strong online presence and grow your audience. From social media strategies to content marketing, discover the tools and techniques that successful creators use.",
    img: "https://images.pexels.com/photos/3183155/pexels-photo-3183155.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "building-online-presence",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    userId: "sample-user"
  }
];

// FETCH DATA WITH AN API
const getData = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/blog", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await res.json();
    
    // If posts array is empty or has error, return sample data
    if (!posts || posts.length === 0 || posts.error) {
      console.log("Using sample data due to database connection issues");
      return samplePosts;
    }

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    console.log("Using sample data due to connection error");
    return samplePosts; // Return sample data on error
  }
};

const BlogPage = async () => {
  // FETCH DATA WITH AN API
  const posts = await getData();

  return (
    <div className="py-12">
      {/* Header Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Creative Minds Blog
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Discover insights, stories, and ideas from our community of creators and thinkers.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search posts..."
              className="block w-full rounded-lg border-0 py-3 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button className="inline-flex items-center gap-x-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <AlertCircle className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No posts available</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first blog post.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.id} className="group">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Note about database connection */}
      {posts === samplePosts && (
        <div className="mx-auto mt-8 max-w-7xl px-6 lg:px-8">
          <div className="rounded-lg bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Currently showing sample data. Connect your MongoDB database to see your actual blog posts.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;

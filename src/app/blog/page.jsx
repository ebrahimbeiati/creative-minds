"use client";

import PostCard from "@/components/postCard/postCard";
import { Search, Filter, AlertCircle, X, Calendar, User } from "lucide-react";
import { useState, useEffect } from "react";

// Sample data for when database is not available
const samplePosts = [
  {
    id: "1",
    title: "Welcome to Creative Minds",
    desc: "This is your first blog post. Start sharing your thoughts, ideas, and stories with the world. Our platform is designed to help creators like you connect with your audience and build meaningful content.",
    img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "welcome-to-creative-minds",
    createdAt: new Date().toISOString(),
    userId: "sample-user",
    category: "Getting Started",
    author: "Creative Minds Team"
  },
  {
    id: "2",
    title: "The Art of Creative Writing",
    desc: "Discover the secrets of compelling storytelling and learn how to craft engaging content that resonates with your readers. From brainstorming ideas to polishing your final draft, we'll cover everything you need to know.",
    img: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "art-of-creative-writing",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    userId: "sample-user",
    category: "Writing",
    author: "Sarah Johnson"
  },
  {
    id: "3",
    title: "Building Your Online Presence",
    desc: "Learn how to establish a strong online presence and grow your audience. From social media strategies to content marketing, discover the tools and techniques that successful creators use.",
    img: "https://images.pexels.com/photos/3183155/pexels-photo-3183155.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "building-online-presence",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    userId: "sample-user",
    category: "Marketing",
    author: "Mike Chen"
  },
  {
    id: "4",
    title: "The Future of Content Creation",
    desc: "Explore emerging trends in content creation and discover how technology is shaping the way we create and consume content. From AI tools to new platforms, stay ahead of the curve.",
    img: "https://images.pexels.com/photos/3183158/pexels-photo-3183158.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "future-of-content-creation",
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    userId: "sample-user",
    category: "Technology",
    author: "Alex Rivera"
  },
  {
    id: "5",
    title: "Finding Your Creative Voice",
    desc: "Every creator has a unique voice waiting to be discovered. Learn how to identify and develop your authentic creative style that sets you apart from the crowd.",
    img: "https://images.pexels.com/photos/3183160/pexels-photo-3183160.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "finding-creative-voice",
    createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    userId: "sample-user",
    category: "Creativity",
    author: "Emma Wilson"
  },
  {
    id: "6",
    title: "Community Building Strategies",
    desc: "Building a loyal community around your content is essential for long-term success. Discover proven strategies for engaging your audience and fostering meaningful connections.",
    img: "https://images.pexels.com/photos/3183162/pexels-photo-3183162.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "community-building-strategies",
    createdAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    userId: "sample-user",
    category: "Community",
    author: "David Kim"
  }
];

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get unique categories from posts
  const categories = ["All", ...new Set(samplePosts.map(post => post.category))];

  // FETCH DATA WITH AN API
  const getData = async () => {
    try {
      const res = await fetch("/api/blog", {
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const fetchedPosts = await res.json();
      
      // If posts array is empty or has error, return sample data
      if (!fetchedPosts || fetchedPosts.length === 0 || fetchedPosts.error) {
        console.log("Using sample data due to database connection issues");
        return samplePosts;
      }

      return fetchedPosts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      console.log("Using sample data due to connection error");
      return samplePosts; // Return sample data on error
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await getData();
      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts);
      setIsLoading(false);
    };

    loadPosts();
  }, []);

  // Filter and search posts
  useEffect(() => {
    let filtered = [...posts];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.author && post.author.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Sort posts
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      
      if (sortBy === "newest") {
        return dateB - dateA;
      } else if (sortBy === "oldest") {
        return dateA - dateB;
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("newest");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-lg border-0 py-3 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-x-2 rounded-lg px-4 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 transition-colors ${
                showFilters 
                  ? 'bg-blue-600 text-white hover:bg-blue-500' 
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
            {(searchTerm || selectedCategory !== "All" || sortBy !== "newest") && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-x-2 rounded-lg bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title A-Z</option>
                </select>
              </div>
              <div className="flex items-end">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{filteredPosts.length}</span> of {posts.length} posts
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Blog Posts Grid */}
      <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <AlertCircle className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              {searchTerm || selectedCategory !== "All" ? "No posts found" : "No posts available"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedCategory !== "All" 
                ? "Try adjusting your search or filter criteria."
                : "Get started by creating your first blog post."
              }
            </p>
            {(searchTerm || selectedCategory !== "All") && (
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
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

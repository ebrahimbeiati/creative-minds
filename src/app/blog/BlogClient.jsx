"use client";

import PostCard from "@/components/postCard/postCard";
import { Search, Filter, AlertCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

const BlogClient = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories from posts
  const categories = ["All", ...new Set(posts.map(post => post.category))];

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
      {posts.length > 0 && posts[0].id === "1" && (
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

export default BlogClient; 
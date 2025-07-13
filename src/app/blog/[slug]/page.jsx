import Image from "next/image";
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";
import { Calendar, Clock, Share2, Bookmark, AlertCircle } from "lucide-react";

// Sample data for when database is not available
const samplePosts = {
  "welcome-to-creative-minds": {
    id: "1",
    title: "Welcome to Creative Minds",
    desc: "This is your first blog post. Start sharing your thoughts, ideas, and stories with the world. Our platform is designed to help creators like you connect with your audience and build meaningful content.\n\nIn this post, we'll explore the fundamentals of content creation and how to get started with your blogging journey. Whether you're a seasoned writer or just beginning, there's something here for everyone.\n\nKey topics we'll cover:\n• Understanding your audience\n• Finding your unique voice\n• Creating engaging content\n• Building a consistent posting schedule\n\nRemember, every great writer started somewhere. The most important thing is to begin and keep going. Your voice matters, and your stories deserve to be heard.",
    img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "welcome-to-creative-minds",
    createdAt: new Date().toISOString(),
    userId: "sample-user"
  },
  "art-of-creative-writing": {
    id: "2",
    title: "The Art of Creative Writing",
    desc: "Discover the secrets of compelling storytelling and learn how to craft engaging content that resonates with your readers. From brainstorming ideas to polishing your final draft, we'll cover everything you need to know.\n\nCreative writing is more than just putting words on paper. It's about connecting with your audience on a deeper level, evoking emotions, and creating memorable experiences.\n\nIn this comprehensive guide, we'll explore:\n• The fundamentals of storytelling\n• Character development techniques\n• Plot structure and pacing\n• Dialogue and description\n• Editing and revision strategies\n\nWhether you're writing fiction, non-fiction, or blog posts, these principles will help you create more engaging and impactful content.",
    img: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "art-of-creative-writing",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    userId: "sample-user"
  },
  "building-online-presence": {
    id: "3",
    title: "Building Your Online Presence",
    desc: "Learn how to establish a strong online presence and grow your audience. From social media strategies to content marketing, discover the tools and techniques that successful creators use.\n\nIn today's digital world, having a strong online presence is crucial for success. It's not just about being visible—it's about building meaningful connections with your audience.\n\nThis guide covers:\n• Social media strategy development\n• Content marketing fundamentals\n• Email list building\n• SEO optimization\n• Community engagement\n• Analytics and measurement\n\nBuilding an online presence takes time and effort, but with the right strategies, you can create a sustainable and growing platform for your content.",
    img: "https://images.pexels.com/photos/3183155/pexels-photo-3183155.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "building-online-presence",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    userId: "sample-user"
  }
};

// FETCH DATA WITH AN API
const getData = async (slug) => {
  try {
    const res = await fetch(`http://localhost:3001/api/blog/${slug}`);

    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }

    const post = await res.json();
    
    // If post has error or is empty, return sample data
    if (!post || post.error) {
      console.log("Using sample data due to database connection issues");
      return samplePosts[slug] || null;
    }

    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    console.log("Using sample data due to connection error");
    return samplePosts[slug] || null; // Return sample data on error
  }
};

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;

  try {
    const post = await getPost(slug);
    return {
      title: post.title,
      description: post.desc,
    };
  } catch (error) {
    // Fallback to sample data for metadata
    const samplePost = samplePosts[slug];
    if (samplePost) {
      return {
        title: samplePost.title,
        description: samplePost.desc,
      };
    }
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
};

const SinglePostPage = async ({ params }) => {
  const { slug } = await params;

  // FETCH DATA WITH AN API
  const post = await getData(slug);

  // If no post found, show 404
  if (!post) {
    return (
      <div className="py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <a 
            href="/blog"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content ? content.split(' ').length : 0;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  return (
    <article className="py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            {post.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{getReadingTime(post.desc)} min read</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                <Bookmark className="h-4 w-4" />
                Save
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.img && (
          <div className="mb-8 aspect-[16/9] overflow-hidden rounded-xl">
            <Image 
              src={post.img} 
              alt={post.title}
              width={800}
              height={450}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Author Info */}
        <div className="mb-8 flex items-center gap-4 border-b border-gray-200 pb-6">
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.desc}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Share this post:</span>
              <div className="flex items-center gap-2">
                <button className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </button>
                <button className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </footer>

        {/* Note about sample data */}
        {samplePosts[slug] && (
          <div className="mt-8 rounded-lg bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> This is sample content. Connect your MongoDB database to see your actual blog posts.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default SinglePostPage;

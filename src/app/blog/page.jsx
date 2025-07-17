import PostCard from "@/components/postCard/postCard";
import BlogClient from "./BlogClient";

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

const BlogPage = async () => {
  // For now, just use sample data to avoid build issues
  // When you have a proper API endpoint, you can uncomment the fetch logic
  const posts = samplePosts;

  return <BlogClient initialPosts={posts} />;
};

export default BlogPage;

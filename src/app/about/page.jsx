import Image from "next/image";
import { 
  Users, 
  Lightbulb, 
  Heart, 
  Zap, 
  Globe, 
  Award,
  ArrowRight,
  Star,
  CheckCircle
} from "lucide-react";

export const metadata = {
  title: "About Creative Minds - Our Story & Mission",
  description: "Learn about Creative Minds, our mission to empower creators, and how we're building the future of content creation and community building.",
};

const AboutPage = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Creative Minds</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're on a mission to empower creators, thinkers, and innovators to share their ideas with the world. 
              Our platform connects creative minds and builds communities around meaningful content.
            </p>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:gap-y-20">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Our Mission
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Creative Minds was born from a simple belief: everyone has a story worth sharing. 
                  We believe that the best ideas come from diverse perspectives and that technology 
                  should make it easier, not harder, to connect with others.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Our platform is designed to break down barriers between creators and their audiences. 
                  Whether you're a seasoned writer, a budding entrepreneur, or someone with a unique 
                  perspective to share, we provide the tools and community you need to succeed.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a 
                    href="/blog"
                    className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
                  >
                    Explore Our Blog
                    <ArrowRight className="ml-2 inline-block h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                  <Image 
                    src="/about.png" 
                    alt="Creative Minds Team" 
                    width={600}
                    height={450}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Our Values</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What drives us forward
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              These core values guide everything we do, from product development to community building.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Lightbulb className="h-5 w-5 flex-none text-blue-600" />
                  Innovation
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    We constantly push the boundaries of what's possible, creating new ways for 
                    creators to express themselves and connect with their audience.
                  </p>
                </dd>
              </div>
              
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Heart className="h-5 w-5 flex-none text-blue-600" />
                  Community
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    We believe in the power of community. Every creator deserves a supportive 
                    network of like-minded individuals who inspire and encourage growth.
                  </p>
                </dd>
              </div>
              
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Zap className="h-5 w-5 flex-none text-blue-600" />
                  Excellence
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    We strive for excellence in everything we do, from the quality of our platform 
                    to the support we provide to our community members.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Growing Community Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Building a community of creators
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                We're just getting started, but we're committed to building something special together.
              </p>
            </div>
            
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col bg-white p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Growing Community</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">100+</dd>
              </div>
              <div className="flex flex-col bg-white p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Quality Posts</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">500+</dd>
              </div>
              <div className="flex flex-col bg-white p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Countries</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">25+</dd>
              </div>
              <div className="flex flex-col bg-white p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Daily Growth</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">10+</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Why Choose Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform is designed with creators in mind, providing all the tools and features 
              you need to build your audience and share your ideas.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">Community First</h3>
                <p className="mt-2 text-gray-600">
                  Connect with like-minded creators, get feedback, and grow your audience in a 
                  supportive environment.
                </p>
              </div>
              
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">Global Reach</h3>
                <p className="mt-2 text-gray-600">
                  Share your ideas with a global audience. Our platform connects creators from 
                  all around the world.
                </p>
              </div>
              
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">Quality Content</h3>
                <p className="mt-2 text-gray-600">
                  Our platform promotes high-quality, meaningful content that adds value to 
                  readers' lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to share your story?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Join thousands of creators who are already building their audience and sharing 
              their ideas with the world.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a 
                href="/blog"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
              >
                Start Reading
              </a>
              <a 
                href="/contact"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
              >
                Contact us <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

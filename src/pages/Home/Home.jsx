import { Rocket, Users, Code, LayoutDashboard, GitBranch, ShieldCheck, Zap, ArrowRight, Star, CheckCircle, PlusCircle, Search, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-15 px-4 border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
            <Zap className="w-4 h-4 mr-2" /> The #1 platform for startup builders
          </div>
          <h1 className="text-6xl font-bold mb-6 leading-tight text-gray-900">
            Find your Team Members and<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Grow your Startup Idea</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            From Idea to Funded Startup 🚀 Build or Join Your Dream Team<br />
            Kickstart your journey with the right team, advice and investor exposure - All in one place.
          </p>
          
          {/* Trust indicator */}
          <div className="flex justify-center items-center gap-2 mb-12">
            <div className="bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200">
              <span className="text-2xl font-bold text-blue-600">91,613</span>
              <span className="text-gray-600 ml-2">action takers have joined Solvearn</span>
            </div>
          </div>
          
          {/* Two-path CTA */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* I have an idea */}
            <div className="bg-white p-8 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <PlusCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I have an idea</h3>
              <div className="space-y-3 mb-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <span className="text-gray-600">Create a project card</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <span className="text-gray-600">Select team members with roles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <span className="text-gray-600">Turn vision into a funded startup together</span>
                </div>
              </div>
              <button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg transform hover:scale-105"
              >
                <Rocket className="w-5 h-5" />
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* I want to join a project */}
            <div className="bg-white p-8 rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I want to join a project</h3>
              <div className="space-y-3 mb-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <span className="text-gray-600">Browse interesting projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <span className="text-gray-600">Apply to your favorite team with skills</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <span className="text-gray-600">Make a difference in new team from day one</span>
                </div>
              </div>
              <button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium px-8 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg transform hover:scale-105"
              >
                <Users className="w-5 h-5" />
                Browse Projects
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Value Proposition */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Everything you need to build together</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From finding the right team members to organizing, designing, and meeting - your complete startup collaboration platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-blue-600" />,
                title: "Team Matching",
                desc: "Find co-founders, developers, designers, and business experts who share your vision and complement your skills",
                color: "blue"
              },
              {
                icon: <LayoutDashboard className="w-8 h-8 text-purple-600" />,
                title: "Project Organization",
                desc: "Organize tasks, track progress, and manage your startup journey with integrated project management tools",
                color: "purple"
              },
              {
                icon: <Code className="w-8 h-8 text-green-600" />,
                title: "Design & Development",
                desc: "Collaborative workspace for designing, prototyping, and developing your product with your team",
                color: "green"
              },
              {
                icon: <Users className="w-8 h-8 text-orange-600" />,
                title: "Team Meetings",
                desc: "Virtual meeting rooms, video calls, and communication tools to keep your team connected",
                color: "orange"
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-red-600" />,
                title: "Investor Exposure",
                desc: "Get your startup noticed by investors and access funding opportunities through our network",
                color: "red"
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />,
                title: "Legal Framework",
                desc: "Templates for team agreements, equity splits, and legal documents to protect your partnership",
                color: "indigo"
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`w-16 h-16 rounded-xl bg-${feature.color}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Enhanced Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to turn your idea into reality?</h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Join 91,613+ entrepreneurs who are building the future together on Solvearn
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button 
              className="inline-flex items-center justify-center bg-white text-blue-600 font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Join Solvearn for free
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <button 
              className="inline-flex items-center justify-center border-2 border-white text-white font-medium px-10 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              How it works
            </button>
          </div>
          <p className="text-blue-200 text-sm">
            No credit card required • Free to join and create projects
          </p>
        </div>
      </section>
    </div>
  );
}
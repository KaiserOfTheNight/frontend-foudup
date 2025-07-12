import { Rocket, Users, Code, LayoutDashboard, GitBranch, ShieldCheck, Zap, ArrowRight, Star, CheckCircle, PlusCircle, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import profile1 from '../../assets/profile1.jpg';
import profile2 from '../../assets/profile2.jpg';
import profile3 from '../../assets/profile3.jpg';
import profile4 from '../../assets/profile4.jpg';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 md:py-15 px-4 border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U1ZTVlNSIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-sm font-medium mb-6 md:mb-8 shadow-lg">
            <Zap className="w-4 h-4 mr-2" /> The #1 platform for startup builders
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
            From Vision to Version 1.0<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Find the People Who'll Build It</span>
          </h1>
        
          <Link 
            to={"/register"} 
            className="inline-flex items-center from-blue-600 to-purple-600 font-medium px-6 py-3 md:px-8 md:py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 mb-8 md:mb-12 shadow-lg hover:shadow-xl transform hover:scale-101"
          >
            🌷 Join FoundUp
          </Link>
          
          {/* Trust indicator */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-8 md:mb-12">
              {/* Placeholder for user photos */}
              <div className="flex -space-x-4 sm:-space-x-6">
                {[profile1, profile2, profile3, profile4].map((img, index) => (
                  <img key={index} src={img} alt="FoundUp member" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <span className="text-xl sm:text-2xl font-bold text-blue-600">540+</span>
              <span className="text-gray-600 text-sm sm:text-base md:text-lg ml-2">action takers have joined FoundUp</span>
          </div>
          
          {/* Two-path CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-8 md:mb-12">
            {/* I have an idea */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <PlusCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 md:mb-4">I have an idea</h3>
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 text-left">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</div>
                  <span className="text-sm sm:text-base text-gray-600">Create a project card</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">2</div>
                  <span className="text-sm sm:text-base text-gray-600">Select team members with roles</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">3</div>
                  <span className="text-sm sm:text-base text-gray-600">Turn vision into a funded startup together</span>
                </div>
              </div>
              <Link to={"/projects/create"} 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-6 py-3 md:px-8 md:py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg transform hover:scale-105"
              >
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Start Your Project</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </div>
            
            {/* I want to join a project */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <Search className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 md:mb-4">I want to join a project</h3>
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 text-left">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</div>
                  <span className="text-sm sm:text-base text-gray-600">Browse interesting projects</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">2</div>
                  <span className="text-sm sm:text-base text-gray-600">Apply to your favorite team with skills</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">3</div>
                  <span className="text-sm sm:text-base text-gray-600">Make a difference in new team from day one</span>
                </div>
              </div>
              <Link to={"/explore"} 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium px-6 py-3 md:px-8 md:py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg transform hover:scale-105"
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Browse Projects</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Value Proposition */}
      <section className="py-12 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Everything you need to build together</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              From finding the right team members to organizing, designing, and meeting - your complete startup collaboration platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Users className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />,
                title: "Team Matching",
                desc: "Find co-founders, developers, designers, and business experts who share your vision and complement your skills",
                bgColor: "bg-blue-50",
                hoverBgColor: "hover:bg-blue-100"
              },
              {
                icon: <LayoutDashboard className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />,
                title: "Project Organization",
                desc: "Organize tasks, track progress, and manage your startup journey with integrated project management tools",
                bgColor: "bg-purple-50",
                hoverBgColor: "hover:bg-purple-100"
              },
              {
                icon: <Code className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />,
                title: "Design & Development",
                desc: "Collaborative workspace for designing, prototyping, and developing your product with your team",
                bgColor: "bg-green-50",
                hoverBgColor: "hover:bg-green-100"
              },
              {
                icon: <Users className="w-7 h-7 sm:w-8 sm:h-8 text-orange-600" />,
                title: "Team Meetings",
                desc: "Virtual meeting rooms, video calls, and communication tools to keep your team connected",
                bgColor: "bg-orange-50",
                hoverBgColor: "hover:bg-orange-100"
              },
              {
                icon: <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-red-600" />,
                title: "Investor Exposure",
                desc: "Get your startup noticed by investors and access funding opportunities through our network",
                bgColor: "bg-red-50",
                hoverBgColor: "hover:bg-red-100"
              },
              {
                icon: <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />,
                title: "Legal Framework",
                desc: "Templates for team agreements, equity splits, and legal documents to protect your partnership",
                bgColor: "bg-indigo-50",
                hoverBgColor: "hover:bg-indigo-100"
              }
            ].map((feature, index) => (
              <div key={index} className={`group bg-white p-6 md:p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${feature.hoverBgColor}`}>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2 md:mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA */}
      <section className="py-12 md:py-24 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 md:mb-6">Ready to turn your idea into reality?</h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 md:mb-12 leading-relaxed">
            Join 1000+ entrepreneurs who are building the future together on FoundUp
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 md:mb-8">
            <button 
              className="inline-flex items-center justify-center bg-white text-blue-600 font-bold px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base">Join FoundUp for free</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
            </button>
            <button 
              className="inline-flex items-center justify-center border-2 border-white text-white font-medium px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              <span className="text-sm sm:text-base">How it works</span>
            </button>
          </div>
          <p className="text-blue-200 text-xs sm:text-sm">
            No credit card required • Free to join and create projects
          </p>
        </div>
      </section>
    </div>
  );
}
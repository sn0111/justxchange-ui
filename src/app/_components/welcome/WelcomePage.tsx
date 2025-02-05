/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Users, ShieldCheck, GraduationCap } from 'lucide-react';
import defaultImg from '../../../public/images/home.jpg';
import {
  FaUserPlus,
  FaShoppingCart,
  FaHandshake,
  FaLightbulb,
} from 'react-icons/fa';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      url: defaultImg.src,
      title: 'Your Campus Marketplace',
      subtitle: 'Discover amazing deals on textbooks, electronics, and more',
    },
    {
      url: defaultImg.src,
      title: 'Safe & Secure Trading',
      subtitle: 'Verified college students only - trade with confidence',
    },
    {
      url: defaultImg.src,
      title: 'Local Campus Exchange',
      subtitle: 'Meet safely on campus for convenient exchanges',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const featureData = [
    {
      title: 'Trusted Community',
      description: 'Join a verified community of students from your campus.',
      icon: <Users className="text-white" size={24} />,
    },
    {
      title: 'Safe Exchanges',
      description: 'Meet safely on campus in designated exchange zones.',
      icon: <ShieldCheck className="text-white" size={24} />,
    },
    {
      title: 'Student Exclusive',
      description: 'Access deals and items specifically for college students.',
      icon: <GraduationCap className="text-white" size={24} />,
    },
  ];

  const howItWorksSteps = [
    {
      title: 'Sign Up',
      description:
        'Register with your college email and verify your student status.',
      icon: <FaUserPlus className="text-white text-2xl" />,
    },
    {
      title: 'Browse & List',
      description:
        'Browse items or list your own for sale within your campus community.',
      icon: <FaShoppingCart className="text-white text-2xl" />,
    },
    {
      title: 'Exchange or Buy',
      description: 'Meet locally on campus for safe and convenient exchanges.',
      icon: <FaHandshake className="text-white text-2xl" />,
    },
  ];

  return (
    <div className="min-h-screen  bg-gradiant-header pb-8">
      {/* Fixed Header */}
      {/* <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">
              <span className=" bg-gradiant-theme text-transparent bg-clip-text animate-gradient-x">
                JustXchange
              </span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLoginOpen(true)}
              className=" bg-gradiant-theme 
            text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transform transition-all 
            duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 
            hover:animate-gradient-x flex items-center group"
            >
              Login
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => null}
              className=" bg-gradiant-theme 
            text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transform transition-all 
            duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 
            hover:animate-gradient-x flex items-center group"
            >
              <span className="hidden sm:inline">Contact</span>
              <Mail className="ml-2 sm:ml-0 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </nav>
      </header> */}

      {/* Hero Section with Image Carousel */}
      <div className="relative ">
        {/* Image Carousel */}
        <div className="relative h-[calc(100vh-4rem)]">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 
                ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Carousel Controls */}
          <div className="absolute z-20 bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 
                  ${currentSlide === index ? 'bg-white w-8' : 'bg-white/50'}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center space-y-8 px-4">
              <h2 className="text-5xl md:text-7xl font-bold text-white">
                Campus Marketplace,{' '}
                <span className=" bg-gradiant-theme text-transparent bg-clip-text">
                  Simplified
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-xl text-white/90">
                Buy, sell, and exchange within your college community. Safe,
                local, and exclusively for students.
              </p>

              {/* Quality Badges */}
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                  <span className="text-white font-medium">
                    ✓ Verified Students Only
                  </span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                  <span className="text-white font-medium">
                    ✓ Secure Campus Exchange
                  </span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                  <span className="text-white font-medium">
                    ✓ Best Student Deals
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {featureData.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-0.5  bg-gradiant-theme rounded-2xl blur opacity-50 group-hover:opacity-100 transition-all"></div>
              <div className="relative bg-black/80 p-8 rounded-2xl">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                  {feature.icon}
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-24 my-8  bg-gradiant-theme rounded-3xl shadow-2xl">
        {/* Unified Heading Inside the Block */}
        {/* Title with Glowing Bulb Effect */}
        <div className="relative flex items-center justify-center gap-3 mb-12">
          {/* Glowing Effect */}
          <div className="absolute -inset-1 bg-yellow-400 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute -inset-4 bg-yellow-300 rounded-full blur-3xl opacity-40"></div>

          {/* Bulb Icon */}
          <div className="relative p-2 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full shadow-[0_0_25px_rgba(255,255,0,0.9)] animate-pulse">
            <FaLightbulb className="text-yellow-500 text-4xl" />
          </div>

          <h2 className="text-3xl font-bold text-center text-white">
            Get Started in <span className="">3 Simple Steps</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Card Content */}
              <div className="relative bg-black/80 p-8 rounded-2xl flex flex-col items-center text-center border border-white/20 shadow-lg transition-transform transform group-hover:scale-105">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-700 shadow-lg mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

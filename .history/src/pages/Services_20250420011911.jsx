'use client'

import Link from "next/link";
import { ArrowRight, MessageSquare, Leaf, Cloud, Calendar, ShoppingCart } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "AI Chatbot",
      description: "Get instant answers to all your farming questions, advice on best practices, and personalized recommendations for your crops.",
      icon: <MessageSquare size={48} className="text-[#117955]" />,
      link: "/services/chat"
    },
    {
      title: "Plant-Cure",
      description: "Identify plant diseases with photo analysis. Get diagnosis and treatment recommendations to keep your crops healthy.",
      icon: <Leaf size={48} className="text-[#117955]" />,
      link: "/services/cure"
    },
    {
      title: "Weather Forecasts",
      description: "Access accurate local weather forecasts, alerts, and agricultural impact predictions tailored to your location.",
      icon: <Cloud size={48} className="text-[#117955]" />,
      link: "/services/weather"
    },
    {
      title: "Crop Calendar",
      description: "Plan your planting and harvesting cycles with our interactive crop calendar customized for your region and crops.",
      icon: <Calendar size={48} className="text-[#117955]" />,
      link: "/services/calender"
    },
    {
      title: "Market Insights",
      description: "Stay updated with current crop prices, market trends, and connect directly with potential buyers for your produce.",
      icon: <ShoppingCart size={48} className="text-[#117955]" />,
      link: "/services/market"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-[#117955] mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Comprehensive digital solutions to help farmers increase productivity, 
          make informed decisions, and achieve better yields.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div 
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
          >
            <div className="mb-4">
              {service.icon}
            </div>
            <h2 className="text-2xl font-semibold text-[#117955] mb-3">{service.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
            <Link 
              href={service.link}
              className="inline-flex items-center text-[#20B297] hover:text-[#117955] font-medium"
            >
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-[#117955] mb-6">Why Choose Our Platform?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="p-4">
            <h3 className="text-xl font-semibold text-[#117955] mb-2">Smart Farming</h3>
            <p className="text-gray-600 dark:text-gray-300">Leverage AI and data-driven insights to optimize your farming practices.</p>
          </div>
          
          <div className="p-4">
            <h3 className="text-xl font-semibold text-[#117955] mb-2">Time Saving</h3>
            <p className="text-gray-600 dark:text-gray-300">Reduce manual work with automation and quick access to critical information.</p>
          </div>
          
          <div className="p-4">
            <h3 className="text-xl font-semibold text-[#117955] mb-2">Increased Yields</h3>
            <p className="text-gray-600 dark:text-gray-300">Make better decisions that lead to improved crop quality and quantity.</p>
          </div>
          
          <div className="p-4">
            <h3 className="text-xl font-semibold text-[#117955] mb-2">Cost Effective</h3>
            <p className="text-gray-600 dark:text-gray-300">Minimize resource wastage and maximize returns on your farming investment.</p>
          </div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>
      </div>

      <div className="mt-16 bg-[#f0f9f6] dark:bg-gray-700 p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#117955] mb-4">Ready to transform your farming?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore our services and start your journey towards smarter, more productive farming.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link 
            href="/services/chat" 
            className="bg-[#117955] hover:bg-[#20B297] text-white font-medium py-3 px-6 rounded-md mr-4"
          >
            Get Started
          </Link>
          <Link 
            href="/contact" 
            className="border border-[#117955] text-[#117955] hover:bg-[#117955] hover:text-white font-medium py-3 px-6 rounded-md"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
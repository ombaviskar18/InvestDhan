import { Contact, Locate, LocateFixed, LocateIcon, Mail, Map, MapPin } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          {/* Brand Information */}
          <div className="mb-8 lg:mb-0 max-w-sm">
            <h2 className="text-3xl font-bold tracking-tight"><span className="text-[#ffffff]">Invest</span><span className="text-[#F83002]">Dhan</span>
            </h2>
            <p className="text-gray-400 mt-3 leading-relaxed">
              InvestDhan empowers investors to explore a wide range of businesses, from innovative startups to established enterprises. Invest with confidence and be part of the next big success story.
            </p>
            <p className="text-gray-500 mt-4">© 2024 InvestDhan. All rights reserved.</p>
          </div>

          {/* Newsletter Subscription */}
          <div className="mb-8 lg:mb-0 lg:max-w-sm">
            <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to get the latest news, insights, and investment opportunities delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mb-4 sm:mb-0 sm:mr-4 text-gray-800 rounded-md focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-gray-600 hover:bg-gray-900 px-6 py-2 rounded-md text-white font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media Links */}
          <div className="mb-8 lg:mb-0 lg:max-w-sm">
            <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
            <div className='flex items-center gap-3 my-2'>
                    <Contact />
                    <span>+91 8999478900</span>
                </div>
                <div className='flex items-center gap-3 my-2'>
                    <Mail />
                    <span>investdhan18@gmail.com</span>
                </div>
                <div className='flex items-center gap-3 my-2'>
                    <MapPin/>
                    <span>Wakad-411057, Pune</span>
                </div>
            {/* <div className="flex space-x-6">
            <a href="https://twitter.com" className="hover:text-gray-400" aria-label="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" className="hover:text-gray-400" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z"/>
              </svg>
            </a>
          </div> */}
          </div>
        
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="auto-container center-margin custom-side-padding bg-footer-pattern bg-cover bg-center bg-black text-white py-12">
      <div className="container mx-auto flex flex-wrap flex-col md:flex-row">
        <div className="flex-1 px-4 mb-8 md:mb-0">
          <h4 className="text-xl mb-4">Contact</h4>
          <p className="mb-2"><strong>Address:</strong> Aptech Rumuomasi</p>
          <p className="mb-2"><strong>Phone:</strong> 09046807203</p>
          <p className="mb-2"><strong>Hours:</strong> 10:00 - 18:00, Mon - Sat</p>
          <div className="mt-4">
            <h4 className="text-xl mb-2">Follow us</h4>
            <div className="flex space-x-4">
              <FaFacebook className="text-2xl hover:text-gray-400" />
              <FaTwitter className="text-2xl hover:text-gray-400" />
              <FaInstagram className="text-2xl hover:text-gray-400" />
              <FaYoutube className="text-2xl hover:text-gray-400" />
            </div>
          </div>
        </div>
        <div className="flex-1 px-4 mb-8 md:mb-0">
          <h4 className="text-xl mb-4">About</h4>
          <p className="mb-2"><a href="#" className="text-white hover:underline">About us</a></p>
          <p className="mb-2"><a href="#" className="text-white hover:underline">Delivery Information</a></p>
          <p className="mb-2"><a href="#" className="text-white hover:underline">Privacy Policy</a></p>
          <p className="mb-2"><a href="#" className="text-white hover:underline">Terms & Conditions</a></p>
          <p className="mb-2"><a href="#" className="text-white hover:underline">Contact Us</a></p>
        </div>
        <div className="flex-1 px-4">
          <h4 className="text-xl mb-4">My Account</h4>
          <p className="mb-2"><a href="#" className="text-white hover:underline">Sign In</a></p>
          <p className="mb-2"><a href="#" className="text-white hover:underline">View Cart</a></p>
          <p className="mb-2"><a href="#" className="text-white hover:underline">My wishlist</a></p>
          <p className="mb-2"><a href="#" className="text-white hover:underline">Track My Order</a></p>
          <p className="mb-2"><a href="#" className="text-white hover:underline">Help</a></p>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-400">
        2023 © All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;

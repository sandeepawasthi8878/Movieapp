import React from 'react';

function Contact() {
  return (
    <div className=" font-semibold  bg-zinc-800 m-[5%] p-[5%] rounded-lg mx-auto text-center">
      <h1 className="text-3xl font-bold text-[#6556CD] mb-6">Contact Us</h1>
      <p className="text-white leading-relaxed mb-4">
        We're here to help you! Reach out to us for any inquiries or support. We aim to provide quick and efficient assistance to all our users.
      </p>
      <ul className="list-none text-white mb-4">
        <li className="mb-2">
          <strong>Email:</strong> support@tmdbproject.com
        </li>
        <li className="mb-2">
          <strong>Phone:</strong> +123456789
        </li>
        <li>
          <strong>Address:</strong> 123 TMDB Street, Movie City, CinemaLand
        </li>
      </ul>
      <p className="text-white leading-relaxed">
        Follow us on social media or drop us a message, and we’ll get back to you as soon as possible!
      </p>
    </div>
  );
}

export default Contact;

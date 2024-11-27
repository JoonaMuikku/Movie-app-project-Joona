import React from "react";
import "./Footer.css";

export default function Footer () {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-1">© 2024 Moviq. All Rights Reserved.</p>
        <p>
          <a href="/about" className="text-decoration-none text-light mx-2">
            About Us
          </a>
          |
          <a href="/contact" className="text-decoration-none text-light mx-2">
            Contact
          </a>
          |
          <a
            href="https://github.com/"
            className="text-decoration-none text-light mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};
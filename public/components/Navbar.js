import { useState } from "react";
// import "../../styles";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 text-white">
      {/* Top bar */}
      <div className="flex justify-between items-center">
        <button
          className="md:hidden"
          onClick={() => {
            console.log("set open clicked");
            setOpen(!open);
          }}
        >
          {/* Hamburger icon */}
          <div
            className={`${
              open ? "hamburger-container-open" : "hamburger-container-closed"
            } md:flex md:space-x-6 mt-4 md:mt-0 `}
          >
            <span className="hamburger"></span>
            <span
              className={`${
                open ? "hamburger-middle-open" : "hamburger-middle-closed"
              }`}
            ></span>
            <span className="hamburger"></span>
          </div>
        </button>
      </div>

      {/* Links
      <ul
        className={`${
          open ? "block" : "hidden"
        } md:flex md:space-x-6 mt-4 md:mt-0 `}
      >
        <li>
          <a href="/" className="hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="/about" over:underline"className="h>
            About
          </a>
        </li>
        <li>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </li>
      </ul> */}
    </nav>
  );
}

import React from "react";
import Overlay from "../Overlay/Overlay";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav>
        <h2>Nftverse Talewallet </h2>
        <ul>
          <li>
            <Overlay
              bgColor={"orange"}
              textColor={"black"}
              width={"700px"}
              height={"400px"}
            />
          </li>
          <li>
            <a href="#">Item 2</a>
          </li>
          <li>
            <a href="#">Item 3</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

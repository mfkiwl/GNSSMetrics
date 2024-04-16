import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex gap-8 items-center justify-between py-2 px-2">
      <NavLink
        to={"/"}
        className={({ isActive, isPending, isTransitioning }) =>
          [
            isPending ? `` : ``,
            isActive ? `font-bold text-green-600` : `font-normal`,
            isTransitioning ? `` : ``,
          ].join(" ")
        }
      >
        Load from file
      </NavLink>
      <NavLink
        to={"/live"}
        className={({ isActive, isPending, isTransitioning }) =>
          [
            isPending ? `` : ``,
            isActive ? `font-bold text-green-600` : `font-normal`,
            isTransitioning ? `` : ``,
          ].join(" ")
        }
      >
        Connect to live test
      </NavLink>
    </nav>
  );
};

export default Navbar;

import { useState } from "react";

const Nav = () => {
  return (
    <div className="shadow-xl fixed z-20 w-full bg-base-100">
      <div className="navbar w-[80%] m-auto">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">SCMS</a>
        </div>
      </div>
    </div>
  );
};

export default Nav;

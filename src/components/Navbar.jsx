import React, { useContext } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/icons/avatar.png";
import { AuthContext } from "../context/AuthContextProvider";
import Switch from "./Switch";
import ChatRoomBtn from "./ChatRoomBtn";


const Navbar = () => {
  const { currentUser, logOut } = useContext(AuthContext);
  // const currentUser = { displayName: "maximilian" };
  // const currentUser = false;
  return (
    <div>
      <nav
        className="flex w-full flex-wrap items-center justify-between bg-neutral-200 dark:bg-gray-900 py-3 dark:text-neutral-200 shadow-lg lg:flex-wrap lg:justify-start fixed top-0 z-20"
        data-te-navbar-ref=""
      >
        <div className="flex w-full flex-wrap items-center justify-between px-6">
          <Link className="px-4 py-0.5 text-2xl font-semibold border-bordered rounded border-2 border-gray-900 dark:border-gray-light " to="/" onClick={()=> window.scrollTo(0, 0)}>
            Movie App23
          </Link>

          {/* Collapsible wrapper */}
          {/* Right elements */}
          <div className="relative flex items-center">
            {currentUser && (
              <h5 className="mr-2 capitalize">{currentUser.displayName}</h5>
            )}
            <Link to="/chatroom"><ChatRoomBtn/></Link>
            <Switch />
            <div className="relative" data-te-dropdown-ref="">
              <span
                className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                id="dropdownMenuButton2"
                role="button"
                data-te-dropdown-toggle-ref=""
                aria-expanded="false"
              >
                <img
                  src={currentUser.photoURL || avatar}
                  className="rounded-full"
                  style={{ height: 25, width: 25 }}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </span>
              <ul
                className="absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                aria-labelledby="dropdownMenuButton2"
                data-te-dropdown-menu-ref=""
              >
                {currentUser ? <li>
                  <Link
                    className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-200 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                    to="/profile"
                    data-te-dropdown-item-ref=""
                  >
                    Profile
                  </Link>
                </li> : null}
                {currentUser ? null : <li>
                  <Link
                    className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-200 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                    to="/register"
                    data-te-dropdown-item-ref=""
                  >
                    Register
                  </Link>
                </li>}
                {currentUser ? null : <li>
                  <Link
                    className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                    to="/login"
                    data-te-dropdown-item-ref=""
                  >
                    Login
                  </Link>
                </li>}
                {currentUser ? <li>
                  <span
                    className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                    role="button"
                    data-te-dropdown-item-ref=""
                    onClick={logOut}
                  >
                    Logout
                  </span>
                  </li> : null}
              </ul>
            </div>
          </div>
          {/* Right elements */}
        </div>
      </nav>
      <div className="h-[60px]"></div>
    </div>
  );
};

export default Navbar;

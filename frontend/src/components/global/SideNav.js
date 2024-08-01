import React from "react";
import { Link, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
const navElement = [
    { name: "Home", icon: "ant-design:home-filled", href: "/" },
    { name: "Explore", icon: "material-symbols:explore-outline-rounded", href: "/explore" },
    { name: "SearchDev", icon:"material-symbols:search", href: "/userslist"},
    { name: "Likes", icon: "icon-park-solid:like", href: "/likes" },
    { name: "Saved", icon: "dashicons:cloud-saved", href: "/saved" },
    { name: "Profile", icon: "healthicons:ui-user-profile", href: "/profile" },
    { name: "Logout", icon: "oi:account-logout", href: "/logout" },
    
];



const SideNav = (props) => {
    const { setShowSidebar, open } = props;

    const location = useLocation();
    let cur = location.pathname.split("/").at(1);
    if (cur.length === 0) cur = "home";

    return (
        <div
            className={`w-full h-full transition-all duration-300 relative  flex flex-col bg-white border-gray-300 dark:bg-black ${
                open ? "border-r-4" : "sm:border-r-4"
            }`}
        >
            <header
                className={`flex dark:bg-[#030409] w-[100%] bg-gray-100  h-14 lg:scale-[1_!important] transition origin-left duration-500 justify-center gap-4 dark:border-b-gray-900 text-2xl text-blue-500 items-center ${
                    !open && "scale-0"
                }`}
            >
                <span className="text-4xl xm:2xl">
                    <img className="w-auto h-12 sm:h-15" src= 'logo_rmtag.png' alt=""/> 
                </span>
                 
            </header>
            <nav className="flex flex-col py-2 flex-grow overflow-y-scroll overflow-x-hidden">
                <button
                    className={`lg:hidden transition duration-300 rotate top-3 sm:top-4 text-blue-500 sm:absolute sm:left-auto sm:right-2 ${
                        open
                            ? "sm:rotate-[720deg] absolute left-auto right-2"
                            : "fixed left-4 sm:absolute sm:left-auto sm:right-2"
                    }`}
                    onClick={() => setShowSidebar((p) => !p)}
                    aria-hidden="true"
                >
                     
                     
                </button>
                {navElement.map((el) => {
                    const activeClass =
                        el.name.toLowerCase() === cur
                            ? "text-blue-500 scale-110 hover"
                            : "text-gray-900 dark:text-gray-50";
                    return (
                        <Link
                            key={el.icon + el.name}
                            to={el.href}
                            className={`w-full flex text-left justify-left transition hover:scale-110 pl-[25%] items-center h-14 pt-3 ${activeClass}`}
                        >
                            <span className="text-[1.4rem] ">
                                <iconify-icon icon={el.icon}></iconify-icon>
                             
                            </span>
                            <span
                                className={`text-[1.2rem] ${
                                    open ? "scale-1" : "scale-0"
                                } transition-all duration-200 pl-6 origin-right lg:scale-100`}
                            >
                                {el.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default SideNav;

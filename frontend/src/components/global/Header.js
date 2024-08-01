import Avatar from "@mui/material/Avatar";
import React from "react";
import useUserContext from "../../contexts/UserContext";
import { Link, useLocation } from "react-router-dom";
import useThemeContext from "../../contexts/themeContext";
 

const Header = (props) => {
    const {
        user,
        profileData: { username, profile_pic },
    } = useUserContext();
    const { darkTheme, setDarkTheme } = useThemeContext();
    const { isError } = props;
    const location = useLocation();
    let cur = location.pathname.split("/").at(1);
    if (cur === "") cur = "home";
    return (
        <header className="flex items-center justify-center pl-12 sm:pl-2 p-2 h-14 absolute w-full bg-gray-100 border-0 text-gray-900 sm:px-8 dark:bg-black">
            <div className="max max-w-6xl w-full flex justify-between">
                <div
                    className={`flex gap-1 text-2xl text-blue-400 items-center`}
                    aria-hidden={true}
                >
                    <span className="text-4xl">
                        
                    </span>
                    <h1 className="font-bold inline-block capitalize">
                        {isError ? "DevSphere" : cur}
                    </h1>
                </div>
                <div className="flex justify-between items-center gap-2 lg:gap-3">
                    <a 
                        className="dark:text-white text-gray-900 text-3xl hover:text-blue-500"
                        href="https://github.com/Bharatk003/Social-Nework-for-Coders"
                        target="_blank"
                        alt="github"
                        rel="noreferrer"
                        aria-label="view code on github"
                    >
                        <span className="fixed -left-[10000000000000000px]">
                            View code on Github
                        </span>
                        <iconify-icon icon="bi:github">Light Theme</iconify-icon>
                    </a>
                    <button
                        className="text-blue-400 h-full text-2xl gap-1 justify-center"
                        onClick={() => setDarkTheme((p) => !p)}
                    >
                        {darkTheme ? (
                            <iconify-icon icon="carbon:light">Light Theme</iconify-icon>
                        ) : (
                            <iconify-icon icon="bi:moon-stars-fill">Dark theme</iconify-icon>
                        )}
                    </button>
                    
                    <Link to={"/profile"} className="flex items-center" >
                        <Avatar src={user && profile_pic} alt={user && username}  >
                            {username && username.at(0).toUpperCase()}
                        </Avatar> 
                        <p className="dark:text-white text-black text-lg xm:static fixed -top-36 capitalize ml-2">
                        {user && username}
                        </p>
                    </Link>
                    
                </div>
            </div>
        </header>
    );
};

export default Header;

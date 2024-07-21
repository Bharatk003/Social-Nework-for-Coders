import React, { useState, useEffect } from "react";
import useUserContext from "../../contexts/UserContext";
import { Navigate, Link } from "react-router-dom";
 
export default function SignIn() {
    const { login, user } = useUserContext();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        document.title = "DevSphere";
        return function () {
            document.title = "DevSphere";
        };
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        login(formData, () => alert("Invalid Login Credentials"));
    }

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

     

    if (user) return <Navigate to="/" />;
    return (
 
            <main className="w-screen h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-white bg rounded-lg shadow-md dark:bg-gray-800 mt-15 px-6 py-4">
                <div className="flex justify-center mx-auto">
                    <img className="w-auto h-22 sm:h-15" src="/white_logo.png" alt="logo"/>
                </div>

             

                <p class="mt-1 text-center text-gray-900 dark:text-gray-100">Login or create account</p>
                <form onSubmit={(e) => handleSubmit(e)} className="w-full flex flex-col gap-3">
                    <div className="w-full mt-4">
                     
                    <input
                        type="text"
                        autoFocus
                        name="username"
                        required
                        value={formData.username}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                        onChange={handleChange}
                        placeholder="username"
                        id="signup-username"
                    />
                    </div>
                    
                    <div>
                    <input
                        type="password"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                        name="password"
                        id="signup-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="password"
                    />
                    </div>
                    
                    
                    <div className="flex items-center justify-between mt-4 mb-4">
                        
                        <button className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
                             
                        >
                            forgot password
                        </button>
                        <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Login
                        </button>

                    </div>
                </form>
                <div className="flex items-center justify-center py-4 text-center bg-gray-100 dark:bg-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-200">
                        Don't have an account,{" "}
                        <Link to="/signup" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">
                        Register
                        </Link>
                    </p>
                </div>
                
            </div>
        </main> 
        
        
    );
}

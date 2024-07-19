import React, { useState } from "react";
import useUserContext from "../../contexts/UserContext";
import { Navigate, Link } from "react-router-dom";

const validUsernamePattern = /^[\w.@+-]+$/;

function validateUsername(username) {
    if (!username || username.at(-1) === " ") return false;
    return Boolean(username.match(validUsernamePattern));
}

export default function SignUp() {
    const { user, signup } = useUserContext();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
    });
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) setPasswordError(true);
        else {
            signup(formData, (error) => {
                const data = error.response.data;
                alert(data.username);
            });
        }
    }

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (!validateUsername(e.target.value)) {
            setUsernameError(true);
        } else setUsernameError(false);
    };

    if (user) return <Navigate to="/" />;
    return (
        <main className="w-screen h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 mt-5">
                <div className="px-6 py-4">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-22 sm:h-15" src="/white_logo.png" alt="Logo" />
                    </div>


                    <p className="mt-1 text-center text-gray-500 dark:text-gray-400">create account</p>

                    <form onSubmit={(e) => handleSubmit(e)} className="mt-4">
                        <div className="w-full mt-4">
                            {usernameError && (
                                <p className="text-sm text-red-500">Invalid username, only letters, numbers, and @/./+/-/_ characters.</p>
                            )}
                            <input
                                type="text"
                                autoFocus
                                name="username"
                                required
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                onChange={handleChange}
                                value={formData.username}
                                placeholder="Username"
                                id="signup-username"
                            />
                        </div>

                        <div className="w-full mt-4">
                            <input
                                type="password"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                name="password"
                                id="signup-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                        </div>

                        <div className="w-full mt-4">
                            <input
                                type="password"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                name="passwordConfirm"
                                id="signup-password-confirm"
                                required
                                value={formData.passwordConfirm}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                            />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <Link to="/signin" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">
                                Forget Password?
                            </Link>
                            <button
                                type="submit"
                                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-200">Already have an account? </span>
                    <Link to="/signin" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </main>
    );
}

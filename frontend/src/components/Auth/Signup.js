import React, { useState } from "react";
import useUserContext from "../../contexts/UserContext";
import { Navigate, Link } from "react-router-dom";

const validUsernamePattern = /^[\w.@+-]+$/;
const validPasswordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
; // At least one letter, one number, and 8 characters

function validateUsername(username) {
    if (!username || username.at(-1) === " ") return false;
    return Boolean(username.match(validUsernamePattern));
}

function validatePassword(password) {
    return Boolean(password.match(validPasswordPattern));
}

export default function SignUp() {
    const { user, signup } = useUserContext();
    const [formData, setFormData] = useState({
        username: "",
        email:"",
        password: "",

        passwordConfirm: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        email:"",
        password: "",
        passwordConfirm: "",
    });

    function handleSubmit(e) {
        e.preventDefault();

        // Reset errors
        setErrors({
            username: "",
            email:"",
            password: "",
            passwordConfirm: "",
        });

        // Client-side validation
        let valid = true;
        let newErrors = {};

        if (!validateUsername(formData.username)) {
            newErrors.username = "Invalid username. Only letters, numbers, and @/./+/-/_ characters are allowed.";
            valid = false;
        }

        if (!validatePassword(formData.password)) {
            newErrors.password = "Invalid password. Must be at least 8 characters long and contain at least one letter and one number.";
            valid = false;
        }

        if (formData.password !== formData.passwordConfirm) {
            newErrors.passwordConfirm = "Passwords do not match.";
            valid = false;
        }

        if (!valid) {
            setErrors(newErrors);
            return;
        }

        signup(formData, (error) => {
            const data = error.response.data;
            alert(data.username);
        });
    }

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        // Clear errors for the field being updated
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "",
        }));
    };

    if (user) return <Navigate to="/" />;
    return (
        <main className="w-screen h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 mt-5">
                <div className="px-6 py-4">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-22 sm:h-15" src="/white_logo.png" alt="Logo" />
                    </div>

                    <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Create Account</p>

                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="w-full mt-4">
                            {errors.username && (
                                <p className="text-sm text-red-500">{errors.username}</p>
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
                                type="email"
                                name="email"
                                required
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email"
                                id="signup-email"
                            />
                        </div>

                        <div className="w-full mt-4">
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password}</p>
                            )}
                            <input
                                type="password"
                                name="password"
                                required
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                id="signup-password"
                            />
                        </div>

                        <div className="w-full mt-4">
                            {errors.passwordConfirm && (
                                <p className="text-sm text-red-500">{errors.passwordConfirm}</p>
                            )}
                            <input
                                type="password"
                                name="passwordConfirm"
                                required
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                value={formData.passwordConfirm}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                id="signup-password-confirm"
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

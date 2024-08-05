import React, { useState, useEffect, useCallback } from "react";
import useUserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";
 

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [profilePictures, setProfilePictures] = useState({});
    const { axiosInstance } = useUserContext();

    const fetchUsers = useCallback(() => {
        axiosInstance
            .get(`/accounts/userList/`, {
                params: {
                    q: searchQuery
                }
            })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
            });
    }, [axiosInstance, searchQuery]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        const fetchProfilePictures = async () => {
            const newProfilePictures = {};
            await Promise.all(users.map(async (user) => {
                try {
                    const response = await axiosInstance.get(`/accounts/${user.id}/info/`);
                    newProfilePictures[user.id] = response.data.profile_pic;
                } catch (error) {
                    console.error(`Error fetching profile picture for user ${user.id}:`, error);
                }
            }));
            setProfilePictures(newProfilePictures);
        };

        if (users.length > 0) {
            fetchProfilePictures();
        }
    }, [users, axiosInstance]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="w-[95%] max-w-[598px] p-3 mt-2 ml-40 bg-gray-100 dark:bg-black dark:bg-opacity-90 dark:shadow-xl dark:border-gray-800 border-b-4 rounded-lg">
            <input
                type="text"
                placeholder="Search users"
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <ul className="mt-4 ml-10">
                {users.map(user => (
                    <li key={user.id} className="flex justify-between items-center border-b py-2">
                        <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                            <div className="flex justify-center -mt-16 md:justify-end">
                                <img
                                    src={profilePictures[user.id] || "/default-profile-pic.jpg"}
                                    alt={user.username}
                                    className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
                                />
                            </div>
                            <h1>
                                <Link
                                    to={`/user/${user.id}`}
                                    className="text-lg font-medium text-blue-600 capitalize dark:text-blue-400"
                                    tabIndex="0"
                                    role="link"
                                >
                                    {user.username}
                                </Link>
                                <div className="-mt-4 text-right dark:text-gray-200">profession</div>
                            </h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!
                            </p>
                            <div className="flex justify-end mt-4">
                                {/* Additional content */}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;

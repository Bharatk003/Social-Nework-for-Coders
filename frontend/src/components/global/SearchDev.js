import React, { useState, useEffect, useCallback } from "react";
import useUserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
 
const SearchDev = () => {
    const { axiosInstance } = useUserContext();
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const {
        user,
        profileData: { username, profile_pic },
    } = useUserContext();
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="ml-16 items-centerw-[95%] max-w-[598px] p-3 mt-2 bg-gray-100 dark:bg-black dark:bg-opacity-90 dark:shadow-xl dark:border-gray-800 border-b-4 rounded-lg">
            <input
                type="text"
                placeholder="Search users"
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <ul className="mt-4 ml-16">
                {users.map(user => (
                     

                    <div class="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <div class="flex justify-center -mt-16 md:justify-end">
                        <Avatar src={avatar}>{user.at(0).toUpperCase()}</Avatar>

                        </div>

                        <h2 class="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">Bio</h2>

                        <p class="mt-2 text-sm text-gray-600 dark:text-gray-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!</p>

                        <div class="flex justify-end mt-4">
                            <Link to={`/user/${user.id}`} class="text-lg font-medium text-blue-600 dark:text-blue-300" tabindex="0" role="link">{user.username}</Link>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default SearchDev;

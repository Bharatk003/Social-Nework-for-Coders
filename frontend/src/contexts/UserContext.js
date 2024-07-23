import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const userContext = createContext();

const defaultProfileData = {
    username: "",
    date_joined: "",
    profile_pic: "",
    following: "",
    follower: "",
};

const pyAnywhere = "https://social-nework-for-coders.onrender.com/";

function UserContextProvider({ children }) {
    const userTokensFromStorage = JSON.parse(localStorage.getItem("userTokens"));
    const [user, setUser] = useState(
        userTokensFromStorage && jwtDecode(userTokensFromStorage.access)
    );
    const SERVERURL = ["localhost:3000", "127.0.0.1:3000"].includes(window.location.host)
        ? "http://localhost:8000/"
        : pyAnywhere;
    const [profileData, setProfileData] = useState(defaultProfileData);
    const [tokens, setTokens] = useState(userTokensFromStorage);

    const axiosInstance = useCallback(() => {
        return axios.create({
            baseURL: SERVERURL + "api",
            headers: {
                Authorization: `Bearer ${tokens && tokens.access}`,
            },
        });
    }, [SERVERURL, tokens]);

    const fetchUserData = useCallback(async () => {
        if (tokens) {
            try {
                const response = await axiosInstance().get("accounts/info/");
                setProfileData(response.data);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        }
    }, [axiosInstance, tokens]);

    const login = (data, onFailure) => {
        axiosInstance()
            .post("/accounts/token/", {
                username: data.username,
                password: data.password,
            })
            .then((response) => {
                if (response.status === 200) {
                    data = response.data;
                    setUser(jwtDecode(data.access));
                    setTokens(data);
                    localStorage.setItem("userTokens", JSON.stringify(data));
                    fetchUserData();
                }
            })
            .catch((err) => {
                onFailure();
            });
    };

    const signup = (validatedData, onFailure) => {
        axiosInstance()
            .post("/accounts/signup/", validatedData)
            .then((response) => {
                if (response.status < 400 && response.status >= 200) {
                    const { tokens } = response.data;
                    setUser(jwtDecode(tokens.access));
                    setTokens(tokens);
                    localStorage.setItem("userTokens", JSON.stringify(tokens));
                    fetchUserData();
                }
            })
            .catch((error) => onFailure(error));
    };

    const updateInfo = async (formData, onSuccess, onFailure) => {
        axiosInstance()
            .patch("accounts/profile/update/", formData)
            .then((response) => {
                onSuccess(response);
            })
            .catch((e) => {
                onFailure(e);
            });
    };

    const logout = () => {
        setUser(null);
        setTokens(null);
        setProfileData(defaultProfileData);
        localStorage.clear();
    };

    const authContext = {
        user: user,
        login: login,
        axiosInstance: axiosInstance(),
        logout: logout,
        updateInfo: updateInfo,
        signup: signup,
        profileData: profileData,
        setProfileData: setProfileData,
        isDemoUser: profileData.username === "DemoUser",
    };

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    return <userContext.Provider value={authContext}>{children}</userContext.Provider>;
}

const useUserContext = () => {
    return useContext(userContext);
};

export default useUserContext;
export { userContext, UserContextProvider };

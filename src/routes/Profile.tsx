import style from "./Profile.module.css";
import ProfileOption from "../components/ProfileComponents/ProfileOptions";
import { useEffect, useState } from "react";
import Profile_home from "../components/ProfileComponents/Profile_home";
import Profile_privacy from "../components/ProfileComponents/Profile_privacy";
import Profile_security from "../components/ProfileComponents/Profile_security";
import { type userType } from "../Utils/UserData";
import { API_URL } from "../config";

import profileImage from "./../assets/imgs/ta.jpg";//Apagar depois, vai vir da API também.

type ProfilePages = "home" | "privacy" | "security";

const Profile = () => {
    const [currentPage, setCurrentPage] = useState<ProfilePages>("home");
    const [userData, setUserData] = useState<userType>({
        email: "",
        username: "",
        userImage: ""
    });

    useEffect(() => {
        fetch(`${API_URL}/user`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((data) => data.json())
            .then((data) => {
                setUserData({
                    email: data?.email,
                    username: data?.username,
                    userImage: profileImage
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className={style.containerProfile}>
            <ProfileOption changePage={setCurrentPage} buttonFocused={currentPage} />

            {currentPage === "home" && <Profile_home profile_image={userData!.userImage} username={userData!.username} />}

            {currentPage === "privacy" && <Profile_privacy profile_image={userData!.userImage} username={userData!.username} email={userData!.email} />}

            {currentPage === "security" && <Profile_security />}

        </div>
    )
}

export default Profile;
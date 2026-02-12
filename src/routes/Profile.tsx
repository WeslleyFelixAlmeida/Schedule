import style from "./Profile.module.css";
import ProfileOption from "../components/ProfileComponents/ProfileOptions";
import { useEffect, useState } from "react";
import Profile_home from "../components/ProfileComponents/Profile_home";
import Profile_privacy from "../components/ProfileComponents/Profile_privacy";
import Profile_security from "../components/ProfileComponents/Profile_security";
import { type userType } from "../Utils/UserData";
import { API_URL } from "../config";

import profileImage from "./../assets/imgs/profile.png";//Apagar depois, vai vir da API também.
import useFetch from "../Utils/useFetch";

type ProfilePages = "home" | "privacy" | "security";


const Profile = () => {
    const { isLoading, data, error } = useFetch<userType>({
        apiUrl: `${API_URL}/user`,
        method: "GET"
    });

    const [currentPage, setCurrentPage] = useState<ProfilePages>("home");

    const imageSrc = data ? data.profileImage !== null ?
        `data:${data.imageType};base64,${data.profileImage}` :
        profileImage : profileImage;

    const userData = data
        ? { ...data, profileImage: imageSrc}
        : null;

    return (
        <div className={style.containerProfile}>
            <ProfileOption changePage={setCurrentPage} buttonFocused={currentPage} />

            {isLoading && <p>Carregando...</p>}
            {error && <p>Ocorreu um erro</p>}

            {(currentPage === "home" && !isLoading && !error && userData) && <Profile_home profileImage={userData!.profileImage} username={userData!.username} />}

            {(currentPage === "privacy" && !isLoading && !error && userData) && <Profile_privacy profileImage={userData!.profileImage} username={userData!.username} email={userData!.email} />}

            {(currentPage === "security" && !isLoading && !error && userData) && <Profile_security />}

        </div>
    )
}

export default Profile;
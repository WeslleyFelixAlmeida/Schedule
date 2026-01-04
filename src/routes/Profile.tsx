import style from "./Profile.module.css";
import ProfileOption from "../components/ProfileComponents/ProfileOptions";
import { useState } from "react";
import Profile_home from "../components/ProfileComponents/Profile_home";
import Profile_privacy from "../components/ProfileComponents/Profile_privacy";
import Profile_security from "../components/ProfileComponents/Profile_security";
import { userData } from "../Utils/UserData";

type ProfilePages = "home" | "privacy" | "security";

const Profile = () => {
    const [currentPage, setCurrentPage] = useState<ProfilePages>("home");
    return (
        <div className={style.containerProfile}>
            <ProfileOption changePage={setCurrentPage} buttonFocused={currentPage} />

            {currentPage === "home" && <Profile_home profile_image={userData.userImage} username={userData.username} />}
            {currentPage === "privacy" && <Profile_privacy profile_image={userData.userImage} username={userData.username} email={userData.userEmail} />}
            {currentPage === "security" && <Profile_security />}

        </div>
    )
}

export default Profile;
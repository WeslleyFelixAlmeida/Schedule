import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { BsFilePersonFill } from "react-icons/bs";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import style from "./../../routes/Profile.module.css";
import { useEffect, useState } from "react";

type ProfileOption_props = {
    buttonFocused: "home" | "privacy" | "security";
    changePage: Function;
}

type backgroundColor_buttons = { backgroundColor: "var(--dark_blue)" } |
{ backgroundColor: "white" };

const ProfileOption = (props: ProfileOption_props) => {
    const [buttonHomeBgColor, setButtonHomeBgColor] = useState<backgroundColor_buttons>({ backgroundColor: "var(--dark_blue)" });
    const [buttonSecurityBgColor, setButtonSecurityBgColor] = useState<backgroundColor_buttons>({ backgroundColor: "white" });
    const [buttonPrivacyBgColor, setButtonPrivacyBgColor] = useState<backgroundColor_buttons>({ backgroundColor: "white" });

    useEffect(() => {
        switch (props.buttonFocused) {
            case "home":
                setButtonHomeBgColor({ backgroundColor: "var(--dark_blue)" });
                setButtonPrivacyBgColor({ backgroundColor: "white" });
                setButtonSecurityBgColor({ backgroundColor: "white" });
                break;
            case "privacy":
                setButtonHomeBgColor({ backgroundColor: "white" });
                setButtonPrivacyBgColor({ backgroundColor: "white" });
                setButtonSecurityBgColor({ backgroundColor: "var(--dark_blue)" });
                break;
            case "security":
                setButtonHomeBgColor({ backgroundColor: "white" });
                setButtonPrivacyBgColor({ backgroundColor: "var(--dark_blue)" });
                setButtonSecurityBgColor({ backgroundColor: "white" });
                break;
        }
    }, [props.buttonFocused])

    return (
        <aside className={style.containerAsideOptions}>
            <Link to={"/schedules"}>Voltar</Link>
            <button
                onClick={() => { props.changePage("home") }}
                style={buttonHomeBgColor}
            >
                <VscAccount />
                <p>Home</p>
            </button>
            <button
                onClick={() => { props.changePage("privacy") }}
                style={buttonSecurityBgColor}
            >
                <BsFilePersonFill />
                <p>Dados e privacidade</p>
            </button>
            <button
                onClick={() => { props.changePage("security") }}
                style={buttonPrivacyBgColor}
            >
                <RiGitRepositoryPrivateFill />
                <p>Segurança</p>
            </button>
        </aside>
    )
}

export default ProfileOption;
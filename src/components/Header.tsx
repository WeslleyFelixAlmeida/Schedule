import style from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import { BsPersonPlus } from "react-icons/bs";

import Logo from "./Logo";
import Button from "./Button";
import { useEffect, useState } from "react";
import type { ProfileOptionsProps } from "../Utils/Types";
import type { JSX } from "react";
import type { userType } from "../Utils/UserData";
import { API_URL } from "../config";

import profileImage from "./../assets/imgs/ta.jpg";//Apagar depois, vai vir da API também.

const hiddenLoginContainerPages = ["/register", "/home", "/"];
const showHomeLogoLink = ["/register", "/login"];
const notShowPerfilOptions = ["/aboutUs", "/Login", "/Register", "/", "/login", "/register"];

const logout = () => {
    fetch(`${API_URL}/user/logout`, {
        method: "POST",
        credentials: "include"
    })
        // .then((data) => data.json())
        .catch((err) => console.log(err));
}

const Header = () => {
    const [userData, setUserData] = useState<userType>();

    const location = useLocation();
    const navigate = useNavigate();
    const [perfilOptions, setPerfilOptions] = useState<ProfileOptionsProps>({
        transition: "none",
        backgroundColor: "transparent",
        height: "80px"
    });

    const presentPerfilOptions = () => {
        if (perfilOptions.height === "80px") {
            setPerfilOptions({
                transition: "height 0.5s ease",
                backgroundColor: "white",
                height: "390px"
            });
        }
        else {
            setPerfilOptions({
                transition: "none",
                backgroundColor: "transparent",
                height: "80px"
            });
        }
    }

    const profileButton: JSX.Element = <Button
        buttonFunction={() => navigate("/profile")}
        buttons="profile" key={0} />;

    const personalSchedulesButton: JSX.Element = <Button
        buttonFunction={() => navigate("/userSchedules")}
        buttons="schedules" key={1} />;

    const exitButton: JSX.Element = <Button
        buttonFunction={() => {
            logout();
            navigate("/");
        }}
        buttons="logout" key={2} />;

    const createScheduleButton: JSX.Element = <Button
        buttonFunction={() => navigate("/createSchedule")}
        buttons="createSchedule" key={3} />;

    const userCreatedSchedulesButton: JSX.Element = <Button
        buttonFunction={() => navigate("/userCreatedSchedules")}
        buttons="userCreatedSchedules" key={4} />;

    const showButtons = () => {
        const chosedButtons: JSX.Element[] = []
        switch (location.pathname) {
            case "/profile":
                chosedButtons.push(
                    personalSchedulesButton,
                    createScheduleButton,
                    userCreatedSchedulesButton,
                    exitButton);
                break;
            case "/userSchedules":
                chosedButtons.push(profileButton,
                    createScheduleButton,
                    userCreatedSchedulesButton,
                    exitButton);
                break;
            case "/createSchedule":
                chosedButtons.push(profileButton,
                    personalSchedulesButton,
                    userCreatedSchedulesButton,
                    exitButton);
                break;
            case "/userCreatedSchedules":
                chosedButtons.push(profileButton,
                    personalSchedulesButton,
                    createScheduleButton,
                    exitButton);
                break;
            default:
                chosedButtons.push(profileButton,
                    personalSchedulesButton,
                    createScheduleButton,
                    userCreatedSchedulesButton,
                    exitButton);
                break;
        }

        return (
            <div className={style.options}>
                {chosedButtons}
            </div>
        )
    }

    useEffect(() => {
        setPerfilOptions({
            transition: "none",
            backgroundColor: "transparent",
            height: "80px"
        });

        if (!notShowPerfilOptions.includes(location.pathname)) {
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
        }

    }, [location.pathname]);

    return (
        <header className={style.header}>
            {showHomeLogoLink.includes(location.pathname) &&
                <Link to={"/"}>
                    <div className={style.imgContainer} >
                        <Logo color={"white"} size={100} />
                    </div>
                </Link>
            }

            {(location.pathname !== "/register" && location.pathname !== "/login") &&
                <div className={style.imgContainer}>
                    <Logo color={"white"} size={100} />
                </div>
            }

            {hiddenLoginContainerPages.includes(location.pathname) &&
                <div className={style.loginContainer}>
                    <Link to={"/login"}>
                        <div className={style.loginButton}>
                            <VscAccount />
                            <p>Fazer login</p>
                        </div>
                    </Link>
                    <Link to={"/register"}>
                        <div className={style.registerButton}>
                            <BsPersonPlus />
                            <p>Cadastro</p>
                        </div>
                    </Link>
                </div>
            }

            {!notShowPerfilOptions.includes(location.pathname) &&
                <div className={style.perfilOptionsContainer} style={perfilOptions}>
                    <div className={style.containerImage} onClick={() => presentPerfilOptions()} >
                        <img src={userData?.userImage} alt="Imagem de perfil" />
                        {/* Aqui vai vir um imagem do usuário atual! */}
                    </div>
                    <p>{userData?.username}</p>
                    {showButtons()}
                </div>
            }
        </header>
    )
}

export default Header;
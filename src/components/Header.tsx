import style from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";
import { useEffect, useState } from "react";
import type { PerfilOptionsProps } from "../Utils/Types";
import type { JSX } from "react";

import { userData } from "./../Utils/UserDataExample"; //Apagar depois, isso vai vir da API

const hiddenLoginContainerPages = ["/register", "/home", "/"];
const showHomeLogoLink = ["/register", "/login"];
const notShowPerfilOptions = ["/aboutUs", "/Login", "/Register", "/", "/login", "/register"];

const isLogged = false;


const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [perfilOptions, setPerfilOptions] = useState<PerfilOptionsProps>({
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
        buttonFunction={() => console.log("Botão de sair")}
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
                </div>
            }
            {!notShowPerfilOptions.includes(location.pathname) &&
                <div className={style.perfilOptionsContainer} style={perfilOptions}>
                    <div className={style.containerImage} onClick={() => presentPerfilOptions()} >
                        <img src={userData.userImage} alt="Imagem de perfil" />
                        {/* Aqui vai vir um imagem do usuário atual! */}
                    </div>
                    <p>{userData.username}</p>
                    {showButtons()}
                </div>
            }
        </header>
    )
}

export default Header;
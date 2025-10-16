import style from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import perfilImage from "./../assets/imgs/ta.jpg";
import Button from "./Button";


const hiddenLoginContainerPages = ["/register", "/home", "/"];
const showHomeLogoLink = ["/register", "/login"];
const showPerfilOptions = ["/schedules", "/scheduleDetails"];

const isLogged = false;

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <header className={style.header}>
            {showHomeLogoLink.includes(location.pathname) &&
                <Link to={"/"}>
                    <div className={style.imgContainer}>
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
            {showPerfilOptions.includes(location.pathname) &&
                <div className={style.perfilOptionsContainer}>
                    <div className={style.containerImage}>
                        <img src={perfilImage} alt="Imagem de perfil" />
                        {/* Aqui vai vir um imagem do usuário atual! */}
                    </div>
                    <p>Usuário1</p>
                    <div className={style.options}>
                        <Button buttonFunction={() => navigate("/profile")} buttons="profile" />
                        <Button buttonFunction={() => navigate("/userSchedules")} buttons="schedules" />
                        <Button buttonFunction={() => console.log("Botão de sair")} buttons="logout" />
                    </div>
                </div>
            }
        </header>
    )
}

export default Header;
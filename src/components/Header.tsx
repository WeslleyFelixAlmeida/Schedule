import style from "./Header.module.css";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";

const hiddenLoginContainerPages = ["/register", "/home", "/"];
const showHomeLogoLink = ["/register", "/login"];

const Header = () => {
    const location = useLocation();
    console.log(hiddenLoginContainerPages.includes(location.pathname));
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
        </header>
    )
}

export default Header;
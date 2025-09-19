import style from "./Header.module.css";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
    const location = useLocation();
    return (
        <header className={style.header}>
            <Link to={"/"}>
                <div className={style.imgContainer}>
                    <Logo color={"white"} size={100}/>
                </div>
            </Link>
            {location.pathname !== "/login" &&
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
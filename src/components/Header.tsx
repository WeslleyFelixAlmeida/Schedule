import style from "./Header.module.css";
import white_logo from "./../assets/imgs/icone_branco.png";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    return (
        <header className={style.header}>
            <Link to={"/"}>
                <div className={style.imgContainer}>
                    <img src={white_logo} alt="" />
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
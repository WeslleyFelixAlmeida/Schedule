import style from "./Profile_security.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";

const Profile_security = () => {
    return (
        <section className={style.containerSecurity}>
            <h1>Opções de segurança:</h1>
            <div className={style.containerChangePass}>
                <h2>Gostaria de mudar sua senha?</h2>
                <button className={style.buttonsSecurity}>
                    <FaExchangeAlt />
                    Alterar senha
                </button>
            </div>
            <div className={style.containerDeleteAccount}>
                <h2>Deletar conta?</h2>
                <button className={style.buttonsDeleteAcc}>
                    <FaRegTrashAlt />
                    Deletar conta
                </button>
                <p>*Cuidado, não é possível desfazer esta ação!</p>
            </div>
        </section>
    )
}

export default Profile_security;
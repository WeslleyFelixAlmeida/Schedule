import style from "./Profile_privacy.module.css";
import { FaExchangeAlt } from "react-icons/fa";

type Profile_privacy_props = {
    username: string;
    email: string;
    profile_image?: string;
}

const Profile_privacy = (props: Profile_privacy_props) => {
    return (
        <section className={style.containerPersonalInfos}>
            <h1>Informações pessoais:</h1>
            <div className={`${style.emailLine}`}>
                <h2>E-mail do usuário:</h2>
                <p>{props.email}</p>
            </div>
            <div className={style.containerUsername}>
                <h2>Nome de usuário:</h2>
                <p>{props.username}</p>
                <button className={style.buttonsPrivacy}
                    onClick={() => console.log("Alterar nome de usuário")}
                >
                    <FaExchangeAlt />
                    Alterar
                </button>
            </div>
            <div className={style.containerUserImage}>
                <h2>Imagem de perfil:</h2>
                <img src={props.profile_image} alt="Imagem de perfil" />
                <button className={style.buttonsPrivacy}
                    onClick={() => console.log("alterarImagem")}
                >
                    <FaExchangeAlt />
                    Alterar
                </button>
            </div>
        </section>
    )
}

export default Profile_privacy;
import style from "./Profile_home.module.css";

type Profile_home_profile = {
    profileImage?: string;
    username: string;
}

const Profile_home = (props: Profile_home_profile) => {
    return (
        <section className={style.containerProfileHome}>
            <div className={style.containerTopHome}>
                <img src={props.profileImage} alt="imagem de perfil" />
                <h1>Olá, {props.username}</h1>
            </div>
            <p>Nesta seção você consegue ver seus dados e realizar alterações como imagem de perfil, nome de usuário e senha.</p>
        </section>
    )
}

export default Profile_home;
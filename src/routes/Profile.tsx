import { Link } from "react-router-dom";

const Profile = () => {
    return (
        <div>
            <Link to={"/schedules"}>Voltar</Link>
            Perfil
        </div>
    )
}

export default Profile;
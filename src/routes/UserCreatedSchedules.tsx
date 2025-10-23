import { Link } from "react-router-dom";
const UserCreatedSchedules = () => {
    return (
        <div>
            <Link to={"/schedules"}>Voltar</Link>
            eventos criados pelo usuário
        </div>
    )
}

export default UserCreatedSchedules;
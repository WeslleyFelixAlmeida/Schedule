import style from "./UserCreatedSchedules.module.css";
import { Link } from "react-router-dom";
import image from "../assets/imgs/img_teste.jpg";

const UserCreatedSchedules = () => {
    return (
        <div className={style.containerCreatedEvents}>
            <Link to={"/schedules"}>Voltar</Link>
            <h2>Seus eventos criados:</h2>
            <ul className={style.createdEvents}>
                <li>
                    <p>Cabelereiro</p>
                    <div className={style.containerImage}
                    >
                        <div className={style.image}
                        style={{
                            backgroundImage: `url(${image})`
                        }}
                        ></div>

                        <div className={style.containerButtons}>
                            <input type="button" value="Ver participantes" />
                            <input type="button" value="Detalhes" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default UserCreatedSchedules;
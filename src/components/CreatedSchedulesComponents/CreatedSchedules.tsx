import style from "./CreatedSchedule.module.css";
import { Link } from "react-router-dom";
import image from "../../assets/imgs/img_teste.jpg";

type CreatedSchedules_props = {
    createdSchedules: boolean;
    setCreatedSchedules: Function;
    eventId: number;
    setEventId: Function;
    setShowParticipants: Function;
}

const CreatedSchedules = (props: CreatedSchedules_props) => {
    const showParticipants = (eventId: number) => {
        props.setEventId(eventId);
        props.setCreatedSchedules(false);
        props.setShowParticipants(true);
    }

    return (
        <div className={style.containerCreatedEvents}>
            <Link to={"/schedules"}>Voltar</Link>
            <h2>Seus eventos criados:</h2>
            <ul className={style.createdEvents}>
                <li key={0}>
                    <p>Cabelereiro</p>
                    <div className={style.containerImage}
                    >
                        <div className={style.image}
                            style={{
                                backgroundImage: `url(${image})`
                            }}
                        ></div>

                        <div className={style.containerButtons}>
                            <input type="button" value="Ver participantes" onClick={() => showParticipants(324)} />{/*Este id vai vir do banco!*/}
                            <input type="button" value="Detalhes" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default CreatedSchedules;
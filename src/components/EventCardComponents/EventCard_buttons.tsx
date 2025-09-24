import { useLocation, useNavigate } from "react-router-dom";
import style from "./../EventCard.module.css";

type EventCard_buttonProps = {
    buttons: "cancel" | "join" | "scheduleDetails";
    scheduleId: number;
}


const EventCard_buttons = (props: EventCard_buttonProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navegarPagina = (id: number) => {
        navigate(`/scheduleDetails?id=${id}`);
    }

    //Fazer uma função para o participar e o cancelar usando fetch usando o ID como parametro

    return (
        <div className={style.containerButtonsCard}>
            {(props.buttons === "join" && props.buttons) &&
                <input type="button" value="Participar" className={style.detailsAndJoinButton} />
            }
            {(props.buttons === "cancel" && props.buttons) &&
                <input type="button" value="Cancelar" className={style.cancelButton} />
            }
            {location.pathname !== "/scheduleDetails" &&
                < input type="button" value="Detalhes" className={style.detailsAndJoinButton} onClick={() => { navegarPagina(props.scheduleId) }} />
            }
        </div>
    )
}

export default EventCard_buttons;
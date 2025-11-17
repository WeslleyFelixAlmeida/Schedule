import { useState } from "react";
import style from "./ShowParticipants.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";

type ShowParticipants_props = {
    eventId: number;
    setEventId: Function
    setShowParticipants: Function;
    setCreatedSchedules: Function;
}

const ShowParticipants = (props: ShowParticipants_props) => {
    const [listIndex, setListIndex] = useState<number>(0);

    const hideParticipantsContainer = () => {
        props.setShowParticipants(false);
        props.setCreatedSchedules(true);
        props.setEventId(-1);
    }
    //Da para verificar o tipo de evento, para ir criando os dias e por ai vai...


    const goAhead = () => {

    }

    const goBack = () => {

    }

    console.log(props.eventId);
    return (
        <div className={style.showParticipantsPage}>
            <button onClick={hideParticipantsContainer}>Voltar</button>
            <div className={style.containerShowParticipants}>
                <div className={style.containerChangeDayButtons}>
                    <button onClick={goBack}>
                        <IoIosArrowBack />
                    </button>
                    <p>
                        <h2>Escalas do dia: <span>{12}</span></h2>
                    </p>
                    <button onClick={goAhead}>
                        <IoIosArrowForward />
                    </button>
                </div>
                <div className={style.containerParticipantsList}>
                    <ul className={style.participantsList}>
                        <li >
                            <p>usuario1</p>
                            <p>Horário: {"12:20"}</p>
                            <button>
                                Cancelar
                                <FaRegTrashAlt />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default ShowParticipants;
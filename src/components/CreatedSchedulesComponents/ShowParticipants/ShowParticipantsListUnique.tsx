import style from "../ShowParticipants.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";

type schedulesType = {
    id: number;
    date: string;
    schedule: string;
    eventId: number;
    username: string | null;
}

// const cancelParticipation = async (id: number) => {
//     const data = await fetch(`${API_URL}/event/cancel/unique`, {
//         method: "PATCH",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ eventId: id }),
//     });

//     if (!data.ok) {
//         return new Error("Erro na chamada ao servidor!");
//     }

//     return data.json();
// }

const ShowParticipantsListUnique = (props: Pick<schedulesType, "eventId">) => {
    const [schedules, setSchedules] = useState<schedulesType[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/event/personal/unique/${props.eventId}`, {
            method: "GET",
            credentials: "include",
        })
            .then((data) => data.json())
            .then((data) => {
                if (data) {
                    setSchedules(data);
                }

                // console.log(data);
            })
            .catch((err) => console.log(err));
    }, []);

    if (schedules.length < 1) { return null; }
    return (
        <div className={style.containerShowParticipants}>
            <div className={style.containerChangeDayButtons} style={{ justifyContent: "center" }}>
                <h2 style={{ width: "auto" }}>Escalas do dia:
                    <span style={{ marginLeft: "5px" }}>
                        {`${schedules[0].date.split("-")[2]}/${schedules[0].date.split("-")[1]}/${schedules[0].date.split("-")[0]}`}
                    </span>
                </h2>
            </div>
            <div className={style.containerParticipantsList}>
                <ul className={style.participantsList}>
                    {schedules.map((schedule) => (
                        <li key={schedule.id}>
                            <p>{schedule.username ? schedule.username : "HORÁRIO LIVRE"}</p>
                            <p className={style.scheduleItemCenter}>Horário: {schedule.schedule}</p>
                            {schedule.username &&
                                <button>
                                    Cancelar
                                    <FaRegTrashAlt />
                                </button>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ShowParticipantsListUnique;
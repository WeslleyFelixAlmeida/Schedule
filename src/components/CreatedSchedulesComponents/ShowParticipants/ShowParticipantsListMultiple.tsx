import style from "../ShowParticipants.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";

type schedulesType = {
    id: number;
    day: string;
    schedule: string;
    eventId: number;
    username: string | null;
}


const getDays = async (eventId: number) => {
    const days = await fetch(`${API_URL}/event/personal/multiple/days/${eventId}`, {
        method: "GET",
        credentials: "include"
    });

    if (!days.ok) {
        throw new Error("Erro na chamada ao servidor!");
    }

    return days.json();
}

const getSchedules = async (id: number, day: number) => {
    const data = await fetch(`${API_URL}/event/personal/multiple/${id}?day=${day}`, {
        method: "GET",
        credentials: "include"
    });

    if (!data.ok) {
        throw new Error("Erro na chamada ao servidor!");
    }

    return data.json();
}

const ShowParticipantsListMultiple = (props: Pick<schedulesType, "eventId">) => {
    const [listIndex, setListIndex] = useState<number>(0);
    const [schedules, setSchedules] = useState<schedulesType[]>([]);
    const [day, setDays] = useState<number[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const goAhead = async () => {
        if (listIndex < day.length - 1) {
            setListIndex(prev => prev + 1);
            try {
                setIsLoading(!isLoading);
                const data = await getSchedules(props.eventId, day[listIndex + 1]);

                if (data) {
                    setSchedules(data);
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const goBack = async () => {
        if (listIndex > 0) {
            setListIndex(prev => prev - 1);
            try {
                setIsLoading(!isLoading);
                const data = await getSchedules(props.eventId, day[listIndex - 1]);

                if (data) {
                    setSchedules(data);
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        const getData = async () => {
            const days = await getDays(props.eventId);

            if (days) {
                setDays(days);
                const userSchedules = await getSchedules(props.eventId, days[0]);
                if (userSchedules) {//Para atribuir os dados ao state
                    setSchedules(userSchedules);
                }
            }
        }

        getData();
    }, []);

    useEffect(() => {
        if (isLoading) {
            setIsLoading(!isLoading);
        }
    }, [schedules]);

    if (schedules.length < 1) { return null; }
    return (
        <div className={style.containerShowParticipants}>
            <div className={style.containerChangeDayButtons}>
                <button onClick={goBack} disabled={isLoading ? true : false}>
                    <IoIosArrowBack />
                </button>
                <h2>Escalas do dia: <span>{day[listIndex]}</span></h2>
                <button onClick={goAhead} disabled={isLoading ? true : false}>
                    <IoIosArrowForward />
                </button>
            </div>

            <div className={style.containerParticipantsList}>
                <ul className={style.participantsList}>
                    {isLoading &&
                        <div>Carregando...</div>
                    }
                    {(schedules.length > 0 && !isLoading) && schedules.map((schedule) => (
                        <li key={schedule.id}>
                            <p>{schedule.username ? schedule.username : "HORÁRIO LIVRE" + schedule.day}</p>
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

export default ShowParticipantsListMultiple;
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
    userId: string | null;
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
    const [schedules, setSchedules] = useState<schedulesType[][]>([]);
    const [day, setDays] = useState<number[]>([]);
    const [disableButton, setDisableButton] = useState<boolean[]>([false, false]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const goAhead = async () => {
        if (listIndex < day.length - 1) {
            const index = listIndex + 1;
            setListIndex(prev => prev + 1);

            if (!schedules[index]) {
                try {
                    setIsLoading(!isLoading);
                    const data = await getSchedules(props.eventId, day[index]);
                    setSchedules((prev) => [...prev, data]);

                    // if (data) {
                    //     console.log(data);
                    // }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const goBack = async () => {
        if (listIndex > 0) {
            setListIndex(prev => prev - 1);
        }
    }

    useEffect(() => {
        const getData = async () => {
            const days = await getDays(props.eventId);

            if (days) {
                setDays(days);
                const userSchedules = await getSchedules(props.eventId, days[0]);
                if (userSchedules) {//Para atribuir os dados ao state
                    const array = [...schedules];
                    array.push(userSchedules);

                    setSchedules(array);
                }
            }
        }

        getData();
    }, []);

    useEffect(() => {
        if (isLoading) {
            setIsLoading(!isLoading);
        }
        console.log(schedules);
    }, [schedules]);

    useEffect(() => {
        if (isLoading) {
            setDisableButton([true, true]);
        } else {
            setDisableButton([false, false]);
        }

    }, [isLoading]);

    useEffect(() => {
        if (listIndex === 0) {
            setDisableButton([true, false]);
        }
        else if (listIndex === day.length - 1) {
            setDisableButton([false, true]);
        } else {
            setDisableButton([false, false]);
        }

    }, [listIndex]);

    // talvez o problema esteja no listIndex que não muda a tempo!
    if (schedules.length < 1) { return null; }
    return (
        <div className={style.containerShowParticipants}>
            <div className={style.containerChangeDayButtons}>
                <button onClick={goBack} disabled={disableButton[0]}>
                    <IoIosArrowBack />
                </button>
                <h2>Escalas do dia: <span>{day[listIndex]}</span></h2>
                <button onClick={goAhead} disabled={disableButton[1]}>
                    <IoIosArrowForward />
                </button>
            </div>

            <div className={style.containerParticipantsList}>
                <ul className={style.participantsList}>
                    {isLoading &&
                        <div style={{ height: "500px" }}>Carregando...</div>
                    }
                    {(schedules.length > 0 && !isLoading) && schedules[listIndex].map((schedule) => (
                        <li key={schedule.id}>
                            <p>{schedule.userId ? "OCUPADO" : "HORÁRIO LIVRE" + schedule.day}</p>
                            <p className={style.scheduleItemCenter}>Horário: {schedule.schedule}</p>
                            {schedule.userId &&
                                <button onClick={() => console.log(schedule.id)}>
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
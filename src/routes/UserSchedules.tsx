import style from "./UserSchedules.module.css";
import { Link } from "react-router-dom";
import UserSchedules_card from "../components/UserSchedules_card";
import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { exitEvent } from "../Utils/ButtonsFunctions";

type eventDataSchedules_props = {
    id: number; //vai ser usado na função de exitEvent(id -> eventId)
    status: "OPEN" | "CLOSED";
    schedule: string;
    date: string; //Da para considerar os horários pela data exemplo 10/01/2025, apenas os horários deste dia serão apresentados
    name: string;
    type: "UNIQUE" | "MULTIPLE";
    eventId: number;
}

const UserSchedules = () => {
    const [eventsData, setEventsData] = useState<eventDataSchedules_props[]>([]);

    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [hasNext, setHasNext] = useState<boolean>(false);


    const exitEventFunc = async (eventId: number, type: "UNIQUE" | "MULTIPLE") => {
        const response = await exitEvent(eventId, type);

        if (response.success) {
            const events = eventsData.filter((event) => event.eventId !== eventId);
            setEventsData(events);
        } else {
            console.error("Erro ao sair do evento");
        }
    }

    useEffect(() => {
        const callApi = async () => {
            setIsloading(true);
            const apiData = await fetch(`${API_URL}/event/userSchedules?after=${0}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!apiData.ok) {
                setIsloading(false);
                setError(true);
            }

            const data = await apiData.json();
            setEventsData(data.data);
            if (data.hasNext) {
                setHasNext(true);
            }

            setIsloading(false);
        }

        callApi();
    }, []);

    useEffect(() => {

    }, [hasNext]);

    return (
        <div className={style.containerUserSchedules}>
            <Link to={"/schedules"}>Voltar</Link>
            <h1>Agendamentos:</h1>
            <div className={style.containerList}>
                {isLoading && <p>Carregando...</p>}
                {error && <p>Ocorreu um erro.</p>}
                <ul>
                    {eventsData &&
                        eventsData.map((eventData) =>
                            <UserSchedules_card
                                schedule={eventData.schedule}
                                buttonFunction={() => exitEventFunc(eventData.eventId, eventData.type)}
                                key={eventData.id} date={eventData.date} name={eventData.name}
                            />
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default UserSchedules;
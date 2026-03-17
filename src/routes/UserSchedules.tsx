import style from "./UserSchedules.module.css";
import { Link } from "react-router-dom";
import UserSchedules_card from "../components/UserSchedules_card";
import { useEffect, useState } from "react";
import { API_URL } from "../config";

type eventDataSchedules_props = {
    id: number; //vai ser usado na função de exitEvent(id -> eventId)
    status: "OPEN" | "CLOSED";
    schedule: string;
    date: string; //Da para considerar os horários pela data exemplo 10/01/2025, apenas os horários deste dia serão apresentados
    name: string;
}

const scheduleCard = (cardProps: eventDataSchedules_props, key: number) => {
    return <UserSchedules_card schedule={cardProps.schedule}
        buttonFunction={
            () => {
                console.log(`Cancelou o horário: ${cardProps.schedule} no dia: ${cardProps.date}`)
                console.log("Id: " + cardProps.id);
            }
        }
        key={key} date={cardProps.date} name={cardProps.name} />
};

const showCards = (eventsData: eventDataSchedules_props[]) => {
    let lines: any = []
    eventsData.map((event, index) => {
        lines.push(scheduleCard(event, index))
    })

    return lines;
}

const UserSchedules = () => {
    const [eventsData, setEventsData] = useState<eventDataSchedules_props[]>([]);

    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [hasNext, setHasNext] = useState<boolean>(false);

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
                {(!isLoading) && (!error) &&
                    <ul>
                        {showCards(eventsData)}
                        {hasNext && <button>Ver mais</button>}
                    </ul>
                }
            </div>
        </div>
    )
}

export default UserSchedules;
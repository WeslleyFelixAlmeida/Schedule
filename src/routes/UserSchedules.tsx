import style from "./UserSchedules.module.css";
import { Link } from "react-router-dom";
import UserSchedules_card from "../components/UserSchedules_card";
import { useEffect, useState } from "react";
import data from "./../components/ScheduleDetailsComponents/dados.json"; // Apagar depois, serve apenas para puxar dados ficticios.
import { userData } from "../Utils/UserData";

type eventDataSchedules_props = {
    id: number;
    scheduleId: number;
    eventStatusId: number;
    eventHour: string;
    eventDate: string; //Da para considerar os horários pela data exemplo 10/01/2025, apenas os horários deste dia serão apresentados
    title?: string; //Isso deve vir da API também!
}

const scheduleCard = (cardProps: eventDataSchedules_props, key: number) => {
    return <UserSchedules_card eventHour={cardProps.eventHour} buttonFunction={() => console.log(`Cancelou o horário: ${cardProps.eventHour} no dia: ${cardProps.eventDate}`)} key={key} eventDate={cardProps.eventDate} title="Cabeleireiro S.A" />
};

const showCards = (eventsData: eventDataSchedules_props[]) => {
    let lines: any = []
    eventsData.map((event, index) => {
        lines.push(scheduleCard(event, index))
    })

    return lines;
}

const UserSchedules = () => {
    const [eventsData, setEventsData] = useState<eventDataSchedules_props[]>(data);

    useEffect(() => {
        //Usar fetch API para puxar os dados da API
        //setEventsData() <--- usar isso para atribuir os valores a variável
    }, []);// Os dados vão ser puxados aqui com base no ID do usuário

    console.log(showCards(eventsData));
    return (
        <div className={style.containerUserSchedules}>
            <Link to={"/schedules"}>Voltar</Link>
            <h1>Olá, {userData.username}. Veja seus agendamentos abaixo.</h1>
            <div className={style.containerList}>
                <h2>agendamentos:</h2>
                <ul>
                    {showCards(eventsData)}
                </ul>
            </div>
        </div>
    )
}

export default UserSchedules;
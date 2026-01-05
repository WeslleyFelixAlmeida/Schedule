import EventCard from "../components/EventCard";
import style from "./Schedules.module.css";
import { eventData } from "../Utils/UserData";
import { useEffect, useState } from "react";
import type { EventDataProps } from "../Utils/Types";
import { API_URL } from "../config";

/*
Dados esperados da API:
    scheduleId: number
    title: string;
    shortDescription: string;
    description: string;
    maxAmount: number;
    currentStatus: "closed" | "open";
    currentAmount: number;
    eventType: "multipleSchedule" | "uniqueSchedule"; //
    isParticipating: "yes" | "no" | "multipleScheduleSituation"; //
*/


const Schedules = () => {
    const [schedules, setSchedules] = useState<EventDataProps[]>([]);

    // const uniqueSchedule = (props: EventDataProps) => {
    //     return (
    //         <EventCard
    //             eventType={props.eventType}
    //             currentAmount={props.currentAmount}
    //             currentStatus={props.currentStatus}
    //             maxAmount={props.maxAmount}
    //             shortDescription={props.shortDescription}
    //             title={props.title}
    //             isParticipating={props.isParticipating}
    //             scheduleId={props.scheduleId}
    //         />
    //     )
    // }

    // const showCards = (data: EventDataProps[])=>{
    //     const schedulesArray = [];

    //     schedules.map((schedule, index)=>{

    //     });
    // }

    useEffect(() => {
        fetch(`${API_URL}/event`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((data) => data.json())
            .then((data) => {
                console.log(data)
                if (data) {
                    setSchedules(data);
                }
            })
            .catch((err) => console.log(err));
    }, [])


    return (
        <div className={style.containerMain}>
            {Array.from({ length: 15 }, (_, i) => (//Apagar depois
                <EventCard
                    key={i}
                    title={eventData.title}
                    shortDescription={eventData.shortDescription}
                    currentStatus={eventData.currentStatus} //Estas 3 propriedades são o que definem os botões!
                    maxAmount={eventData.maxAmount}
                    currentAmount={eventData.currentAmount}
                    scheduleId={eventData.scheduleId}
                    isParticipating={eventData.isParticipating} //Estas 3 propriedades são o que definem os botões!
                    eventType={eventData.eventType}//Estas 3 propriedades são o que definem os botões!
                />
            ))}
        </div>
    )
}

export default Schedules;
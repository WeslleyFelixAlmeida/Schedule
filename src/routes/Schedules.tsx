import EventCard from "../components/EventCard";
import style from "./Schedules.module.css";
import { eventData } from "../Utils/UserDataExample";
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
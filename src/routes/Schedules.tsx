import EventCard from "../components/EventCard";
import style from "./Schedule.module.css";

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
                    title="Cabeleireiro"
                    shortDescription="Cabeleireiro - Cortes.LTDA, agende um horário"
                    currentStatus="closed" //Estas 3 propriedades são o que definem os botões!
                    maxAmount={12}
                    currentAmount={10}
                    scheduleId={i}
                    isParticipating={"no"} //Estas 3 propriedades são o que definem os botões!
                    eventType="uniqueSchedule" //Estas 3 propriedades são o que definem os botões!
                />
            ))}
        </div>
    )
}

export default Schedules;
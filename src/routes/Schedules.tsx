import EventCard from "../components/EventCard";
import style from "./Schedule.module.css";

// const EventCardPropsTeste = {//Apagar
//     title: "Cabeleireiro",
//     shortDescription: "Cabeleireiro - Cortes.LTDA, agende um horário",
//     currentStatus: "open",
//     maxAmount: 12,
//     currentAmount: 10,
//     buttonsType: "join",
//     scheduleId: 1,
// }

//const eventType = ["uniqueSchedule", "multipleSchedule"] //Isso vai vir do banco de dados com as informações do agendamento

const Schedules = () => {
    return (
        <div className={style.containerMain}>
            {/* <EventCard
                title={"Cabeleireiro"}
                shortDescription={"Cabeleireiro - Cortes.LTDA, agende um horário"}
                currentStatus={"open"}
                maxAmount={12}
                currentAmount={10}
                buttonsType={"scheduleDetails"}
                scheduleId={1}
            /> */}

            {Array.from({ length: 15 }, (_, i) => (//Apagar depois
                <EventCard
                    key={i}
                    title="Cabeleireiro"
                    shortDescription="Cabeleireiro - Cortes.LTDA, agende um horário"
                    currentStatus="open"
                    maxAmount={12}
                    currentAmount={10}
                    buttonsType="scheduleDetails"
                    scheduleId={1}
                />
            ))}
        </div>
    )
}

export default Schedules;
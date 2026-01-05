import style from "./EventCard.module.css";
import { useNavigate } from "react-router-dom";
import type { EventDataProps } from "../Utils/Types";
import { exitEvent as exit, joinEvent as join } from "../Utils/ButtonsFunctions";

import schedule_img from "./../assets/imgs/img_teste.jpg";


type EventCardProps = Pick<
    EventDataProps,
    | "scheduleId"
    | "title"
    | "shortDescription"
    | "eventType"
    | "isParticipating"
    | "currentStatus"
    | "maxAmount"
    | "currentAmount"
>;

const EventCard = (props: EventCardProps) => {
    const navigate = useNavigate();
    
    //Desestruturar este card com children em um elemento principal e o resto dentro como children, verificar layout
    return (
        <div className={style.containerCardSchedule}>

        </div>
    )
}

export default EventCard;
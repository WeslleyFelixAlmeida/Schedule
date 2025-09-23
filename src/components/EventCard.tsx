import style from "./EventCard.module.css";
import Event_image from "./EventCardComponents/Event_image";

import EventCard_status from "./EventCardComponents/EventCard_status";//
import EventCard_amount from "./EventCardComponents/EventCard_amount";//
import EventCard_title from "./EventCardComponents/EventCard_Title";//
import EventCard_buttons from "./EventCardComponents/EventCard_buttons";//

type EventCardProps = {
    title: string;
    shortDescription: string;
    currentStatus: "closed" | "open";
    maxAmount: number;
    currentAmount: number;
    buttonsType: "cancel" | "join" | "scheduleDetails";
    scheduleId: number
}

//Há a possíbilidade de haver eventos de dois tipos, os com um unico horário e os com varios horários

const EventCard = (props: EventCardProps) => {

    return (
        <div className={style.containerMain}>
            <div className={style.containerCardSchedule}>
                <div className={style.elementsCardSchedule}>
                    <div className={style.infoCardSchedule}>
                        <EventCard_title title={props.title} shortDescription={props.shortDescription} />
                        <div className={style.containerStatusAndAmount}>
                            <EventCard_status currentStatus={props.currentStatus} />
                            <EventCard_amount maxAmount={props.maxAmount} currentAmount={props.currentAmount} />
                        </div>
                    </div>
                    <Event_image width="150px" />
                </div>
                <EventCard_buttons buttons={props.buttonsType} scheduleId={props.scheduleId} />
            </div>
        </div>
    )
}

export default EventCard;
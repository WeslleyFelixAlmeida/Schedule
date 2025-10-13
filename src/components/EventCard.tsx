import style from "./EventCard.module.css";
import Event_image from "./EventCardComponents/Event_image";
import { useNavigate } from "react-router-dom";

import type { EventDataProps } from "../Utils/Types";
import EventCard_status from "./EventCardComponents/EventCard_status";//
import EventCard_amount from "./EventCardComponents/EventCard_amount";//
import EventCard_title from "./EventCardComponents/EventCard_Title";//
import Button from "./Button";
import { exitEvent as exit, joinEvent as join } from "../Utils/ButtonsFunctions";
import type { JSX } from "react";

type EventCardProps = Omit<EventDataProps, "description" | "buttonsType">;

const EventCard = (props: EventCardProps) => {
    const navigate = useNavigate();

    const chooseButton = (conditionsCheck: Pick<EventDataProps, "eventType" | "isParticipating" | "currentStatus">) => {
        const detailsButton = (
            <Button buttonFunction={() => navigate(`/scheduleDetails?id${props.scheduleId}`)} buttons="details" key={0} />
        );

        const cancelButton = (
            <Button buttonFunction={exit} buttons="cancel" key={1} />
        );

        const joinButton = (
            <Button buttonFunction={join} buttons="join" key={1} />
        );

        const buttons: JSX.Element[] = [];


        if (conditionsCheck.eventType === "uniqueSchedule" &&
            conditionsCheck.isParticipating === "no" &&
            conditionsCheck.currentStatus === "open"
        ) {
            buttons.push(joinButton);

        } else if (conditionsCheck.eventType === "uniqueSchedule" &&
            conditionsCheck.isParticipating === "yes" &&
            conditionsCheck.currentStatus === "open") {
            buttons.push(cancelButton);

        } else if (conditionsCheck.eventType === "uniqueSchedule" &&
            conditionsCheck.isParticipating === "yes" &&
            conditionsCheck.currentStatus === "closed") {
            buttons.push(cancelButton);
        }
        
        buttons.push(detailsButton);
        return (
            <div className={style.containerButtonsCard}>
                {buttons}
            </div>
        )
    }

    return (
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
            {chooseButton({ eventType: props.eventType, isParticipating: props.isParticipating, currentStatus: props.currentStatus })}
        </div>
    )
}

export default EventCard;
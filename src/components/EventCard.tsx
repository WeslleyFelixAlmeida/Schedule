import style from "./EventCard.module.css";
import { useNavigate } from "react-router-dom";

import type { EventDataProps } from "../Utils/Types";
import EventCard_status from "./EventCardComponents/EventCard_status";//
import Button from "./Button";
import { exitEvent as exit, joinEvent as join } from "../Utils/ButtonsFunctions";
import type { JSX } from "react";

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
            <div className={style.infoCardSchedule}>
                <div className={style.containerText}>
                    <h2>{props.title}</h2>
                    <p>{props.shortDescription}</p>
                </div>
                <EventCard_status currentStatus={props.currentStatus} />
                {props.eventType === "uniqueSchedule" && (
                    <div className={style.containerAmount}>
                        <div className={`${style.AmountCircle} ${style.StatusAndAmountCircle}`}></div>
                        <p><span>{props.currentAmount}/{props.maxAmount}</span> Pessoas</p>
                    </div>
                )}
            </div>
            <img src={schedule_img} alt="Imagem do evento" />
            {chooseButton({ eventType: props.eventType, isParticipating: props.isParticipating, currentStatus: props.currentStatus })}
        </div>
    )
}

export default EventCard;
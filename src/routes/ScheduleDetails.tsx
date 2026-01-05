import style from "./ScheduleDetails.module.css";
import schedule_img from "./../assets/imgs/img_teste.jpg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Details_MultipleSchedule from "../components/ScheduleDetailsComponents/Details_multipleSchedule";
import Button from "./../components/Button";
import type { EventDataProps } from "../Utils/Types";
import { exitEvent as exit, joinEvent as join } from "../Utils/ButtonsFunctions";
import type { JSX } from "react";
import EventCard_status from "../components/EventCardComponents/EventCardStatus";

import { eventData } from "../Utils/UserData";

type ScheduleDetailsProps = Pick<
    EventDataProps,
    | "title"
    | "shortDescription"
    | "description"
    | "eventType"
    | "isParticipating"
    | "currentStatus"
    | "scheduleId"
    | "maxAmount"
    | "currentAmount"
>;


const ScheduleDetails = () => {
    const [params] = useSearchParams();
    const scheduleId = Number(params.get("id"));

    const [showMultipleSchedule, setShowMultipleSchedule] = useState<{ display: string }>({
        display: "none"
    });

    const scheduleData: ScheduleDetailsProps = eventData; //Isso deve vir da API
    console.log(scheduleData);

    //------------------------------------------------------------------
    const navigate = useNavigate();

    const chooseButton = (conditionsCheck: Pick<EventDataProps, "eventType" | "isParticipating" | "currentStatus" | "scheduleId">) => {
        const cancelButton = (
            <Button buttonFunction={exit} buttons="cancel" key={1} />
        );

        const joinButtonMultiple = (
            <Button buttonFunction={() => { setShowMultipleSchedule({ display: "flex" }) }} buttons="join" key={1} />
        );

        const joinButtonUnique = (
            <Button buttonFunction={join} buttons="join" key={1} />
        )

        const buttons: JSX.Element[] = [];


        if (conditionsCheck.eventType === "uniqueSchedule" &&
            conditionsCheck.isParticipating === "no" &&
            conditionsCheck.currentStatus === "open"
        ) {
            buttons.push(joinButtonUnique);
        }
        else if (conditionsCheck.eventType === "multipleSchedule" &&
            conditionsCheck.currentStatus === "open"
        ) {
            buttons.push(joinButtonMultiple);
        }
        else if (conditionsCheck.eventType === "uniqueSchedule" &&
            conditionsCheck.isParticipating === "yes" &&
            conditionsCheck.currentStatus === "open") {
            buttons.push(cancelButton);

        } else if (conditionsCheck.eventType === "uniqueSchedule" &&
            conditionsCheck.isParticipating === "yes" &&
            conditionsCheck.currentStatus === "closed") {
            buttons.push(cancelButton);
        }
        if (conditionsCheck.currentStatus === "closed") {
            buttons.push(<p className={style.closedEventMessage} key={2}>Evento fechado!</p>);
        }

        return (
            <div className={style.containerButtonsCard}>
                {buttons}
            </div>
        )
    }
    //------------------------------------------------------------------

    return (
        <div className={style.containerMain}>
            <Link to={"/schedules"}>Voltar</Link>
            <div className={style.detailsTitleContainer}>
                <h1>{scheduleData.title}</h1>
                <h2>{scheduleData.shortDescription}</h2>
            </div>
            <EventCard_status currentStatus={scheduleData.currentStatus} />

            <div className={style.centerDetailsContainer}>
                <div className={style.imageContainer}>
                    <div className={style.mainImageContainer}>
                        <img src={schedule_img} alt="imagem evento" />
                    </div>
                </div>
                <div className={style.descriptionContainer}>
                    <h2>Descrição:</h2>
                    <p>{scheduleData.description}</p>
                </div>
            </div>

            {chooseButton({ currentStatus: scheduleData.currentStatus, eventType: scheduleData.eventType, isParticipating: scheduleData.isParticipating, scheduleId: scheduleData.scheduleId })}
            {scheduleData.eventType === "multipleSchedule" &&
                (
                    <Details_MultipleSchedule scheduleId={1} setShowMultipleSchedule={setShowMultipleSchedule} showMultipleSchedule={showMultipleSchedule} />
                )
            }
        </div>
    )
}

export default ScheduleDetails;
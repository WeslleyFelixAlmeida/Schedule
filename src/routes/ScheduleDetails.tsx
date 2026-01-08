import style from "./ScheduleDetails.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { exitEvent as exit, joinEvent as join } from "../Utils/ButtonsFunctions";
import Button from "./../components/Button";
import { API_URL } from "../config";
import EventCardStatus from "../components/EventCardComponents/EventCardStatus";
import Details_MultipleSchedule from "../components/ScheduleDetailsComponents/Details_multipleSchedule";

type ScheduleDetailsProps = {
    id: number
    title: string;
    shortDescription: string;
    currentStatus: "CLOSED" | "OPEN";
    eventType: "MULTIPLE" | "UNIQUE";
    currentAmount: number;
    maxAmount: number;
    isParticipating: boolean;
    eventImage: string;
    description: string;
}

const ScheduleDetails = () => {
    const [params] = useSearchParams();
    const scheduleId = Number(params.get("id"));
    const navigate = useNavigate();
    const [showMultipleSchedule, setShowMultipleSchedule] = useState<{ display: string }>({
        display: "none"
    });

    const [scheduleData, setScheduleData] = useState<ScheduleDetailsProps>({
        id: scheduleId,
        title: "",
        shortDescription: "",
        currentStatus: "OPEN",
        eventType: "UNIQUE",
        currentAmount: 0,
        maxAmount: 0,
        isParticipating: false,
        eventImage: "",
        description: "",
    });

    const chooseButton = (conditionsCheck: Pick<ScheduleDetailsProps, "eventType" | "isParticipating" | "currentStatus" | "id">) => {
        const cancelButton = (
            <Button buttonFunction={() => exit(scheduleData.id)} buttons="cancel" key={1} />
        );

        const joinButtonMultiple = (
            <Button buttonFunction={() => { setShowMultipleSchedule({ display: "flex" }) }} buttons="join" key={1} />
        );

        const joinButtonUnique = (
            <Button buttonFunction={() => join(scheduleData.id)} buttons="join" key={1} />
        )

        const buttons: JSX.Element[] = [];


        if (conditionsCheck.eventType === "UNIQUE" &&
            !conditionsCheck.isParticipating &&
            conditionsCheck.currentStatus === "OPEN"
        ) {
            buttons.push(joinButtonUnique);
        }
        else if (conditionsCheck.eventType === "MULTIPLE" &&
            conditionsCheck.currentStatus === "OPEN"
        ) {
            buttons.push(joinButtonMultiple);
        }
        else if (conditionsCheck.eventType === "UNIQUE" &&
            conditionsCheck.isParticipating &&
            conditionsCheck.currentStatus === "OPEN") {
            buttons.push(cancelButton);

        }
        else if (conditionsCheck.eventType === "UNIQUE" &&
            conditionsCheck.isParticipating &&
            conditionsCheck.currentStatus === "CLOSED") {
            buttons.push(cancelButton);
        }

        if (conditionsCheck.currentStatus === "CLOSED") {
            buttons.push(<p className={style.closedEventMessage} key={2}>Evento fechado!</p>);
        }

        return (
            <div className={style.containerButtonsCard}>
                {buttons}
            </div>
        )
    }

    //------------------------------------------------------------------

    useEffect(() => {
        fetch(`${API_URL}/event/${scheduleId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((data) => data.json())
            .then((data) => {
                if (!data) {
                    navigate("/schedules");
                }
                console.log(data);
                setScheduleData(data);

            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <div className={style.containerMain}>
            <Link to={"/schedules"}>Voltar</Link>
            <div className={style.detailsTitleContainer}>
                <h1>{scheduleData.title}</h1>
                <h2>{scheduleData.shortDescription}</h2>
            </div>
            <EventCardStatus currentStatus={scheduleData.currentStatus} />
            {scheduleData.eventType === "UNIQUE" &&
                <div className={style.containerAmount}>
                    <p>Quantidade de pessoas:</p>
                    <div className={style.amountBox}>
                        <p>{scheduleData.currentAmount}</p>
                        <p>/</p>
                        <p>{scheduleData.maxAmount}</p>
                    </div>
                </div>
            }
            <div className={style.centerDetailsContainer}>
                <div className={style.imageContainer}>
                    <div className={style.mainImageContainer}>
                        {scheduleData.eventImage !== "" &&
                            <img src={scheduleData.eventImage} alt="imagem evento" />
                        }
                    </div>
                </div>
                <div className={style.descriptionContainer}>
                    <h2>Descrição:</h2>
                    <p>{scheduleData.description}</p>
                </div>
            </div>

            {chooseButton(
                {
                    id: scheduleData.id,
                    currentStatus: scheduleData.currentStatus,
                    eventType: scheduleData.eventType,
                    isParticipating: scheduleData.isParticipating
                })}
            {scheduleData.eventType === "MULTIPLE" &&
                (
                    <Details_MultipleSchedule scheduleId={scheduleData.id} setShowMultipleSchedule={setShowMultipleSchedule} showMultipleSchedule={showMultipleSchedule} />
                )
            }
        </div>
    )
}

export default ScheduleDetails;
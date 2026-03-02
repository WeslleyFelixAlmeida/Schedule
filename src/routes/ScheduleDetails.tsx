import style from "./ScheduleDetails.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { exitEvent, joinEvent } from "../Utils/ButtonsFunctions";
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

type MessageType = {
    message_1: { show: boolean },
    message_2: { show: boolean },
    message_3: { show: boolean },
    message_4: { show: boolean },
    message_5: { show: boolean },
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

    const [joinedEventTitle, setJoinedEventTitle] = useState<string>("");

    const [showMessages, setShowMessages] = useState<MessageType>({
        message_1: { show: false },
        message_2: { show: false },
        message_3: { show: false },
        message_4: { show: false },
        message_5: { show: false },
    });

    const clearMessages = () => {
        setShowMessages({
            message_1: { show: false },
            message_2: { show: false },
            message_3: { show: false },
            message_4: { show: false },
            message_5: { show: false },
        });
    }

    const handleJoinEvent = async (eventId: number, eventType: "UNIQUE" | "MULTIPLE") => {
        const result = await joinEvent(eventId, eventType);
        if (!result.success) {
            setShowMessages((prev) => ({ ...prev, message_3: { show: true } }));
        } else if (result.isFull) {
            setShowMessages((prev) => ({ ...prev, message_2: { show: true } }));
        } else {
            setShowMessages((prev) => ({ ...prev, message_1: { show: true } }));

            setScheduleData((prev) => ({ ...prev, isParticipating: !prev.isParticipating, currentAmount: prev.currentAmount + 1 }))
        }

        setTimeout(() => {
            clearMessages();
        }, 3000);
    };

    const handleExitEvent = async (eventId: number, eventType: "UNIQUE" | "MULTIPLE") => {
        const result = await exitEvent(eventId, eventType);
        if (!result.success) {
            setShowMessages((prev) => ({ ...prev, message_5: { show: true } }));
        }
        else {
            setShowMessages((prev) => ({ ...prev, message_4: { show: true } }));
            setScheduleData((prev) => ({ ...prev, isParticipating: !prev.isParticipating, currentAmount: prev.currentAmount - 1 }))
        }

        setTimeout(() => {
            clearMessages();
        }, 3000);
    };

    const chooseButton = (conditionsCheck: ScheduleDetailsProps) => {
        const cancelButton = (
            <Button buttonFunction={() => handleExitEvent(scheduleData.id, scheduleData.eventType)} buttons="cancel" key={1} />
        );

        const joinButtonMultiple = (
            <Button buttonFunction={() => { setShowMultipleSchedule({ display: "flex" }) }} buttons="join" key={1} />
        );

        const joinButtonUnique = (
            <Button buttonFunction={() => handleJoinEvent(scheduleData.id, scheduleData.eventType)} buttons="join" key={1} />
        )

        const buttons: JSX.Element[] = [];


        if (conditionsCheck.eventType === "UNIQUE" &&
            !conditionsCheck.isParticipating &&
            conditionsCheck.currentStatus === "OPEN" &&
            conditionsCheck.currentAmount !== conditionsCheck.maxAmount
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

        if (conditionsCheck.currentAmount === conditionsCheck.maxAmount &&
            !conditionsCheck.isParticipating
        ) {
            buttons.push(
                <p className={style.closedEventMessage} key={2}>Evento lotado!</p>
            )
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
        fetch(`${API_URL}/event/eventData/${scheduleId}`, {
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

                setJoinedEventTitle(data.title);
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

            {showMessages.message_1.show &&
                <p className={`${style.message} ${style.successMessage}`}>Você entrou no evento: <span style={{ textDecoration: "underline", marginLeft: "10px" }}> {joinedEventTitle}</span></p>
            }

            {showMessages.message_2.show &&
                <p className={`${style.message} ${style.errorMessage}`}>Não há vagas neste evento!</p>
            }

            {showMessages.message_3.show &&
                <p className={`${style.message} ${style.errorMessage}`}>Ocorreu um erro ao tentar entrar no evento.</p>
            }

            {showMessages.message_4.show &&
                <p className={`${style.message} ${style.successMessage}`}>Você saiu do evento: <span style={{ textDecoration: "underline", marginLeft: "10px" }}> {joinedEventTitle}</span></p>
            }


            {showMessages.message_5.show &&
                <p className={`${style.message} ${style.errorMessage}`}>Ocorreu um erro ao tentar sair do evento.</p>
            }

            {chooseButton(scheduleData)}
            {scheduleData.eventType === "MULTIPLE" &&
                (
                    <Details_MultipleSchedule scheduleId={scheduleData.id} setShowMultipleSchedule={setShowMultipleSchedule} showMultipleSchedule={showMultipleSchedule} />
                )
            }
        </div>
    )
}

export default ScheduleDetails;
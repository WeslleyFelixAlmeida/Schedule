import style from "./Schedules.module.css";
import { useEffect, useState } from "react";
import { Card } from "../components/EventCardComponents/Card";
import { API_URL } from "../config";
import { exitEvent, joinEvent } from "../Utils/ButtonsFunctions";
import { useNavigate } from "react-router-dom";

type eventType = {
    id: number
    title: string;
    shortDescription: string;
    currentStatus: "CLOSED" | "OPEN";
    eventType: "MULTIPLE" | "UNIQUE";
    currentAmount: number;
    maxAmount: number;
    isParticipating: boolean;
    eventImage: string;
}

type MessageType = {
    message_1: { show: boolean },
    message_2: { show: boolean },
    message_3: { show: boolean },
}

const Schedules = () => {
    const navigate = useNavigate();
    const [schedules, setSchedules] = useState<eventType[]>([]);
    const [joinedEventMessage, setJoinMessage] = useState<{
        eventTitle: string,
        noSpot: boolean,
        eventId: number
    }>({ eventTitle: "", noSpot: false, eventId: -1 });

    const [showMessages, setShowMessages] = useState<MessageType>({
        message_1: { show: false },
        message_2: { show: false },
        message_3: { show: false },
    });

    const [joinedEventTitle, setJoinedEventTitle] = useState<string>("");

    const clearMessages = () => {
        setShowMessages({
            message_1: { show: false },
            message_2: { show: false },
            message_3: { show: false },
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
            setSchedules(prev =>
                prev.map(schedule =>
                    schedule.id === eventId
                        ? {
                            ...schedule,
                            isParticipating: true,
                            currentAmount: schedule.currentAmount + 1
                        }
                        : schedule
                )
            );
        }
        
        setTimeout(() => {
            clearMessages();
            setJoinedEventTitle("");
        }, 3000);
    };

    useEffect(() => {
        fetch(`${API_URL}/event`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((data) => data.json())
            .then((data) => {
                if (data) {
                    setSchedules(data);
                }
            })
            .catch((err) => console.log(err));
    }, [])


    return (
        <div className={style.containerMain}>
            {showMessages.message_1.show &&
                <p className={`${style.message} ${style.successMessage}`}>Você entrou no evento: <span style={{ textDecoration: "underline", marginLeft: "10px" }}> {joinedEventTitle}</span></p>
            }

            {showMessages.message_2.show &&
                <p className={`${style.message} ${style.errorMessage}`}>Não há vagas neste evento!</p>
            }

            {showMessages.message_3.show &&
                <p className={`${style.message} ${style.errorMessage}`}>Ocorreu um erro ao tentar entrar no evento.</p>
            }

            {schedules.length > 0 &&
                schedules.map((schedule) => (
                    <Card.Root key={schedule.id}>
                        <Card.Top>
                            <Card.Text shortDescription={schedule.shortDescription} title={schedule.title} />
                            {schedule.eventType === "UNIQUE" &&
                                <Card.Amount currentAmount={schedule.currentAmount} maxAmount={schedule.maxAmount} />
                            }
                            <Card.Status currentStatus={schedule.currentStatus} />
                        </Card.Top>
                        <Card.Image imgUrl={schedule.eventImage} />
                        <Card.Buttons>
                            {(schedule.eventType === "UNIQUE" && schedule.isParticipating) &&
                                <Card.Button buttonFunction={() => exitEvent(schedule.id)} buttonType={"cancel"} />
                            }
                            {(schedule.eventType === "UNIQUE" && !schedule.isParticipating && schedule.currentStatus === "OPEN") &&
                                <Card.Button
                                    buttonFunction={() => {
                                        setJoinedEventTitle(schedule.title);
                                        handleJoinEvent(schedule.id, schedule.eventType);
                                    }} buttonType={"join"} />
                            }
                            <Card.Button buttonFunction={() =>
                                navigate(`/scheduleDetails?id=${schedule.id}`)} buttonType={"details"} />
                        </Card.Buttons>
                    </Card.Root>
                ))}
            {schedules.length < 1 &&
                <div>
                    <h1>Não há eventos disponíveis no momento</h1>
                </div>
            }
        </div>
    )
}

export default Schedules;
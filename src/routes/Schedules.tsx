import style from "./Schedules.module.css";
import { useEffect, useState } from "react";
import { Card } from "../components/EventCardComponents/Card";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { exitEvent, joinEvent } from "../Utils/ButtonsFunctions";

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


const Schedules = () => {
    const [schedules, setSchedules] = useState<eventType[]>([]);
    const navigate = useNavigate();

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
                                <Card.Button buttonFunction={() => joinEvent(schedule.id)} buttonType={"join"} />
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
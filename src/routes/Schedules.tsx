import style from "./Schedules.module.css";
import { useEffect, useState } from "react";
import type { EventDataProps } from "../Utils/Types";
import { Card } from "../components/EventCardComponents/Card";
import schedule_img from "./../assets/imgs/img_teste.jpg";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { exitEvent, joinEvent } from "../Utils/ButtonsFunctions";

type eventType = {
    id: number
    title: string;
    shortDescription: string;
    currentStatus: "closed" | "open";
    eventType: "MULTIPLE" | "UNIQUE"; //
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
                console.log(data)
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
                                <Card.Button buttonFunction={() => exitEvent()} buttonType={"cancel"} />
                            }
                            {(schedule.eventType === "UNIQUE" && !schedule.isParticipating) &&
                                <Card.Button buttonFunction={() => joinEvent()} buttonType={"join"} />
                            }
                            <Card.Button buttonFunction={() =>
                                navigate(`/scheduleDetails?id${schedule.id}`)} buttonType={"details"} />
                        </Card.Buttons>
                    </Card.Root>
                ))}
        </div>
    )
}

export default Schedules;
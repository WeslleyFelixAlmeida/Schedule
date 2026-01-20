import style from "./UserCreatedSchedules.module.css";
import { useEffect, useState } from "react";
import ShowParticipants from "../components/CreatedSchedulesComponents/ShowParticipants";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import UserCreateSchedulesItem from "../components/CreatedSchedulesComponents/UserCreateSchedulesItem";

type eventType = {
    id: number
    name: string;
    shortDescription: string;
    currentStatus: "CLOSED" | "OPEN";
    type: "MULTIPLE" | "UNIQUE";
    currentAmount: number;
    maxAmount: number;
    isParticipating: boolean;
    image: string;
}

const UserCreatedSchedules = () => {
    const [createdSchedules, setCreatedSchedules] = useState<eventType[]>([]);
    const [showParticipants, setShowParticipants] = useState<boolean>(false);//Por padrão deve iniciar com false
    const [currentEventData, setCurrentEventData] = useState<Pick<eventType, "id" | "type">>({
        id: 0,
        type: "UNIQUE",
    });

    useEffect(() => {
        fetch(`${API_URL}/event/userEvents`, {
            method: "GET",
            credentials: "include",
        })
            .then((data) => data.json())
            .then((data) => {
                if (data) {
                    setCreatedSchedules(data);
                }
                // console.log(data)
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <div className={style.containerUserCreatedSchedules}>
            <div className={style.containerCreatedEvents}>
                <Link to={"/schedules"}>Voltar</Link>
                <h2>Seus eventos criados:</h2>
                {createdSchedules &&
                    (
                        <ul className={style.createdEvents}>
                            {createdSchedules.map((event) => <UserCreateSchedulesItem
                                eventData={event}
                                setCurrentEventData={setCurrentEventData}
                                setShowParticipants={setShowParticipants}
                                key={event.id}
                            />)
                            }
                        </ul>
                    )
                }
            </div>

            {showParticipants &&
                <ShowParticipants
                    currentEventData={currentEventData}
                    setShowParticipants={setShowParticipants}
                />
            }
        </div>
    )
}

export default UserCreatedSchedules;
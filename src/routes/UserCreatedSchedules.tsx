import style from "./UserCreatedSchedules.module.css";
import { useState } from "react";
import ShowParticipants from "../components/CreatedSchedulesComponents/ShowParticipants";
import CreatedSchedules from "../components/CreatedSchedulesComponents/CreatedSchedules";

const UserCreatedSchedules = () => {
    const [createdSchedules, setCreatedSchedules] = useState<boolean>(false);//Por padrão deve iniciar com true
    const [showParticipants, setShowParticipants] = useState<boolean>(true);//Por padrão deve iniciar com false
    const [eventId, setEventId] = useState<number>(-1);

    return (
        <div className={style.containerUserCreatedSchedules}>
            {createdSchedules &&
                <CreatedSchedules
                    createdSchedules={createdSchedules}
                    setCreatedSchedules={setCreatedSchedules}
                    eventId={eventId}
                    setEventId={setEventId}
                    setShowParticipants={setShowParticipants}
                />
            }

            {showParticipants &&
                <ShowParticipants
                    setCreatedSchedules={setCreatedSchedules}
                    setShowParticipants={setShowParticipants}
                    eventId={eventId}
                    setEventId={setEventId}
                />
            }
        </div>
    )
}

export default UserCreatedSchedules;
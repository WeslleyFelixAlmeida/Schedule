import { useState, type ChangeEvent } from "react";
import style from "./CreateSchedule.module.css";
import { Link } from "react-router-dom";
import CreateUniqueSchedule from "../components/CreateScheduleComponents/CreateUniqueSchedule";
import CreateMultipleSchedule from "../components/CreateScheduleComponents/CreateMultipleSchedule";

type EventType = "unique" | "multiple";

const CreateSchedule = () => {
    const [eventType, setEventType] = useState<EventType>("unique");

    const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEventType(e.target.value as EventType);
    };
    
    return (
        <div className={style.containerCreateSchedule}>
            <Link to={"/schedules"}>Voltar</Link>
            <h1>Crie um evento</h1>
            <p>Crie um evento preenchendo as informações abaixo.</p>
            <h2>Escolha um tipo de evento:</h2>
            <div className={style.containerChooseType}>
                <input type="radio"
                    name="choosedEventType"
                    id="uniqueSchedule"
                    value="unique"
                    checked={eventType === "unique"}
                    onChange={handleTypeChange}
                />
                <label htmlFor="uniqueSchedule">Escala única</label>

                <input type="radio"
                    name="choosedEventType"
                    id="multipleSchedule"
                    value="multiple"
                    onChange={handleTypeChange}
                    checked={eventType === "multiple"}
                />
                <label htmlFor="multipleSchedule">Múltiplas escalas</label>
            </div>
            {eventType === "unique" &&
                <CreateUniqueSchedule />
            }
            {eventType === "multiple" &&
                <CreateMultipleSchedule />
            }
        </div>
    )
}

export default CreateSchedule;
import { FaQuestionCircle } from "react-icons/fa";
import { daysMonthAmount } from "../../ScheduleDetailsComponents/Date";
import style from "./Multiple_dayContainer.module.css";
import { useEffect, useState } from "react";
import type { multipleSchedulesProps } from "../../../Utils/Types";

import Message from "../../Message";

type Multiple_dayContainer_props = multipleSchedulesProps;

const Multiple_dayContainer = (props: Multiple_dayContainer_props) => {
    const days = props.days;
    const setDays = props.setDays;

    const chooseDays = (day: number) => {
        if (days[day].checked) {
            let changeValue = [...days];
            changeValue[day].checked = false;
            setDays(changeValue);
        }
        else {
            let changeValue = [...days];
            changeValue[day].checked = true;
            setDays(changeValue);
        }
    }

    const selectAllDays = () => {
        const fillArray = days.map(dayObj => ({
            ...dayObj,
            checked: true
        }));
        setDays(fillArray);
    }

    const removeAlldays = () => {
        const removeArray = days.map(dayObj => ({
            ...dayObj,
            checked: false
        }));
        setDays(removeArray);
    }

    useEffect(() => {
        let fillArray: { day: number, checked: boolean }[] = [];

        for (let day = 1/*currentDay*/; day <= daysMonthAmount; day++) {
            fillArray.push({
                day: day,
                checked: false
            });
        }

        setDays(fillArray);
    }, []);

    const [message, setMessage] = useState<string>("");
    const [showMessage, setShowMessage] = useState<{ display: "none" | "flex" }>({ display: "none" });

    useEffect(() => {
        if (days.some(day => day.checked)) {
            setMessage("");
            setShowMessage({ display: "none" });
        } else {
            setMessage("Você deve selecionar ao menos um dia!");
            setShowMessage({ display: "flex" });
        }
    }, [days]);

    return (
        <div className={style.containerShowDays}>
            <p>
                <span style={{ color: "red" }}>* </span>
                Escolha os dias: <FaQuestionCircle />
            </p>
            <div className={style.containerDays}>
                {days.map((day, index) => (
                    <div key={day.day} className={style.checkBoxContainer}>
                        <input
                            type="checkbox"
                            id={`checkbox${day.day}`}
                            checked={day.checked}
                            onChange={() => chooseDays(index)}
                        />
                        <label htmlFor={`checkbox${day.day}`}>{day.day}</label>
                    </div>
                ))}
            </div>
            <input type="button" value="Selecionar todos" onClick={() => selectAllDays()} />
            <input type="button" value="Desmarcar todos" onClick={() => removeAlldays()} />

            <Message message={message} setDisplay={setShowMessage} type={"alert"} display={showMessage} />
        </div>
    )
}

export default Multiple_dayContainer;
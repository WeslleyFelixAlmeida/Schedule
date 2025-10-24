import { FaQuestionCircle } from "react-icons/fa";
import { currentDate, currentDay, differenceMounthXCurrentDay, daysMonthAmount } from "../../ScheduleDetailsComponents/Date";
import style from "./Multiple_dayContainer.module.css";
import { useEffect, useState, type JSX } from "react";

type Multiple_dayContainer_props = {
    //Vai precisar vir um useState pra ca para poder pegar os dias escolhidos
}

const Multiple_dayContainer = () => {
    const [days, setDays] = useState<{ day: number, checked: boolean }[]>([]);

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
        console.log("clicou!")
        const fillArray = days.map(dayObj => ({
            ...dayObj,
            checked: true
        }));
        setDays(fillArray);
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

    useEffect(() => {
        console.log(days);
    }, [days])

    return (
        <div className={style.containerShowDays}>
            <p>
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
        </div>
    )
}

export default Multiple_dayContainer;
import { FaQuestionCircle } from "react-icons/fa";
import style from "./DayInterval.module.css";
import type { schedulesRulers_props } from "../../../../Utils/Types";
import { useEffect, useState } from "react";
import { daysMonthAmount } from "../../../ScheduleDetailsComponents/Date";


const DayInterval = (props: schedulesRulers_props) => {
    // const [dayInterval, setDayInterval] = useState<{
    //     day: number,
    //     from: string,
    //     to: string
    // }[]>([]);

    const schedulesRulers = props.schedulesRulers;
    const setSchedulesRulers = props.setSchedulesRulers;

    const [dayTimeMin, setDayTimeMin] = useState<string>("00:00");
    const [dayTimeMax, setDayTimeMax] = useState<string>("00:00");
    const [choosedDay, setChosedDay] = useState<number>(0);

    const [personalizedDayIntervals, setPersonalizedDayIntervals] = useState<{
        day: number,
        from: string,
        to: string
    }[]>([]);

    const [personalizedDayIntervalsConfirmed, setPersonalizedDayIntervalsConfirmed] = useState<boolean>(false);

    const handleDayTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let targetId = e.target.id;
        if (targetId === "personalizedDayIntervalMin") {
            setDayTimeMin(value);
        }
        else if (targetId === "personalizedDayIntervalMax") {
            setDayTimeMax(value);
        }
    };

    const buttonCondition = !personalizedDayIntervalsConfirmed ? { display: "block" } : { display: "none" };

    const addDaysInterval = () => {
        if (dayTimeMin < dayTimeMax && choosedDay > 0) {
            const newArray = [...personalizedDayIntervals];
            newArray.push({ day: choosedDay, from: dayTimeMin, to: dayTimeMax });
            setPersonalizedDayIntervals(newArray);
        }
    }

    const removeDaysInterval = (index: number) => {
        const newArray = [...personalizedDayIntervals];
        newArray.splice(index, 1);
        setPersonalizedDayIntervals(newArray);
    }

    const confirmDaysIntervals = () => {
        if (personalizedDayIntervals.length > 0) {
            setPersonalizedDayIntervalsConfirmed(true);
            setSchedulesRulers({ ...schedulesRulers, DayInterval: personalizedDayIntervals });
        }
    }

    const cancelDaysIntervals = () => {
        setPersonalizedDayIntervalsConfirmed(false);
        setSchedulesRulers({ ...schedulesRulers, DayInterval: [] });
    }

    const inputNumberRule = (e: any) => {
        let value = e.currentTarget.value;
        if (value.length > 2) {
            e.currentTarget.value = value.slice(0, 2);
        }

        const num = Number(value);

        if (num > daysMonthAmount) { e.currentTarget.value = `${daysMonthAmount}` };

        if (num === 0 && value.length === 1) { e.currentTarget.value = "1" };

        setChosedDay(num);
    }

    useEffect(() => {
        console.log(personalizedDayIntervals);
    }, [personalizedDayIntervals])
    
    return (
        <div className={style.containerDayInterval}>
            <p>Intervalo em dia específico <FaQuestionCircle /></p>
            {!personalizedDayIntervalsConfirmed &&
                <div className={style.containerInputsDayInterval}>
                    <p>Dia:</p>
                    <input type="number"
                        name="personalizedDayInterval"
                        id="personalizedDayInterval" className={style.choosePersonalizedDay}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onInput={inputNumberRule}
                        onBlur={inputNumberRule}
                        min={1}
                        max={daysMonthAmount}
                    />
                    <p>-</p>
                    <input type="time" name="personalizedDayIntervalMin" id="personalizedDayIntervalMin" value={dayTimeMin} onChange={handleDayTimeChange} />
                    <p>Até</p>
                    <input type="time" name="personalizedDayIntervalMax" id="personalizedDayIntervalMax" value={dayTimeMax} onChange={handleDayTimeChange} />
                    <input type="button" value="+ Adicionar" onClick={addDaysInterval} />
                </div>}
            <ul className={style.dayInterval}>
                {personalizedDayIntervals.map((dayInterval, index) => (
                    <li key={index}>
                        <p>Dia:</p>
                        <p className={style.intervalName}>{dayInterval.day}</p>
                        <p>-</p>
                        <div>{dayInterval.from}</div>
                        <p>Até</p>
                        <div>{dayInterval.to}</div>
                        <input type="button" value="Remover" onClick={() => removeDaysInterval(index)} style={buttonCondition} />
                    </li>
                ))}
            </ul>

            {!personalizedDayIntervalsConfirmed &&
                <input type="button" value="Confirmar" onClick={confirmDaysIntervals} />
            }
            
            {personalizedDayIntervalsConfirmed &&
                <input type="button" value="Cancelar" onClick={cancelDaysIntervals} />
            }
        </div>
    )
}

export default DayInterval;
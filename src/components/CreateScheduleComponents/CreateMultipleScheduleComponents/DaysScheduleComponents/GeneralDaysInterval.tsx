import { FaQuestionCircle } from "react-icons/fa";
import style from "./GeneralDaysInterval.module.css";
import type { schedulesRulers_props } from "../../../../Utils/Types";
import { useEffect, useState } from "react";

const GeneralDaysInterval = (props: schedulesRulers_props) => {
    const schedulesRulers = props.schedulesRulers;
    const setSchedulesRulers = props.setSchedulesRulers;

    const [timeMin, setTimeMin] = useState<string>("00:00");
    const [timeMax, setTimeMax] = useState<string>("00:00");

    const [personalizedIntervals, setPersonalizedIntervals] = useState<{ from: string, to: string }[]>([]);

    const [personalizedIntervalsConfirmed, setPersonalizedIntervalsConfirmed] = useState<boolean>(false);

    const buttonCondition = !personalizedIntervalsConfirmed ? { display: "block" } : { display: "none" };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let targetId = e.target.id;
        if (targetId === "personalizedIntervalMin") {
            setTimeMin(value);
        }
        else if (targetId === "personalizedIntervalMax") {
            setTimeMax(value);
        }
    };

    const addDaysInterval = () => {
        if (timeMin < timeMax) {
            console.log("teste");
            const newArray = [...personalizedIntervals];
            newArray.push({ from: timeMin, to: timeMax });
            setPersonalizedIntervals(newArray);
        }
    }

    const removeDaysInterval = (index: number) => {
        const newArray = [...personalizedIntervals];
        newArray.splice(index, 1);
        setPersonalizedIntervals(newArray);
    }

    const confirmDaysIntervals = () => {
        if (personalizedIntervals.length > 0) {
            setPersonalizedIntervalsConfirmed(true);
            setSchedulesRulers({ ...schedulesRulers, GeneralDaysInterval: personalizedIntervals });
        }
    }

    const cancelDaysIntervals = () => {
        setPersonalizedIntervalsConfirmed(false);
        setSchedulesRulers({ ...schedulesRulers, GeneralDaysInterval: [] });
    }

    // useEffect(() => {
    //     console.log(`timeMin: ${timeMin}`);
    //     console.log(`timeMax: ${timeMax}`);
    // }, [timeMin, timeMax])

    return (
        <div className={style.containerPersonalizedDayInterval}>
            <p>Intervalo(s) geral: <FaQuestionCircle /></p>
            {!personalizedIntervalsConfirmed &&
                <div className={style.containerInputsPersonalized}>
                    <input type="time" name="personalizedIntervalMin" id="personalizedIntervalMin" value={timeMin} onChange={handleTimeChange}
                    />
                    <p>Até</p>
                    <input type="time" name="personalizedIntervalMax" id="personalizedIntervalMax" value={timeMax} onChange={handleTimeChange} />

                    <input type="button" value="+ Adicionar" onClick={addDaysInterval} />
                </div>
            }
            <ul className={style.intervalList}>
                {personalizedIntervals.map((interval, index) => (
                    <li key={index}>
                        <p className={style.intervalName}>Intervalo {index + 1}:</p>
                        <div>{interval.from}</div>
                        <p>Até</p>
                        <div>{interval.to}</div>
                        <input type="button" value="Remover" onClick={() => removeDaysInterval(index)} style={buttonCondition} />
                    </li>
                ))
                }
            </ul>
            {!personalizedIntervalsConfirmed &&
                <input type="button" value="Confirmar" onClick={confirmDaysIntervals} />
            }
            {personalizedIntervalsConfirmed &&
                <input type="button" value="Cancelar" onClick={cancelDaysIntervals} />
            }
        </div>
    )
}

export default GeneralDaysInterval;
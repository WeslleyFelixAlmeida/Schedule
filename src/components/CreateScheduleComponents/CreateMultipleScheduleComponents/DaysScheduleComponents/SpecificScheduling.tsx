import { FaQuestionCircle } from "react-icons/fa";
import style from "./SpecificScheduling.module.css";
import type { schedulesRulers_props } from "../../../../Utils/Types";
import { daysMonthAmount } from "../../../ScheduleDetailsComponents/Date";
import { useEffect, useState } from "react";
import Message from "../../../Message";

const SpecificScheduling = (props: schedulesRulers_props) => {
    const schedulesRulers = props.schedulesRulers;
    const setSchedulesRulers = props.setSchedulesRulers;

    const [daySchedulingMin, setDaySchedulingMin] = useState<string>("00:00");
    const [daySchedulingMax, setDaySchedulingMax] = useState<string>("00:00");
    const [choosedDay, setChosedDay] = useState<number>(0);

    const [personalizedDayScheduling, setPersonalizedDayScheduling] = useState<{
        day: number,
        from: string,
        to: string
    }[]>([]);

    const [personalizedDaySchedulingConfirmed, setPersonalizedDaySchedulingConfirmed] = useState<boolean>(false);

    const handleDayTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let targetId = e.target.id;
        if (targetId === "personalizedScaleMin") {
            setDaySchedulingMin(value);
        }
        else if (targetId === "personalizedScaleMax") {
            setDaySchedulingMax(value);
        }
    };

    const buttonCondition = !personalizedDaySchedulingConfirmed ? { display: "block" } : { display: "none" };

    const addDaysScheduling = () => {
        if (daySchedulingMin < daySchedulingMax && choosedDay > 0) {
            const newArray = [...personalizedDayScheduling];
            newArray.push({ day: choosedDay, from: daySchedulingMin, to: daySchedulingMax });
            setPersonalizedDayScheduling(newArray);
        }
    }

    const removeDaysScheduling = (index: number) => {
        const newArray = [...personalizedDayScheduling];
        newArray.splice(index, 1);
        setPersonalizedDayScheduling(newArray);
    }

    const confirmDaysScheduling = () => {
        if (personalizedDayScheduling.length > 0) {
            setPersonalizedDaySchedulingConfirmed(true);
            setSchedulesRulers({ ...schedulesRulers, SpecificScheduling: personalizedDayScheduling });
        }
    }

    const cancelDaysScheduling = () => {
        setPersonalizedDaySchedulingConfirmed(false);
        setSchedulesRulers({ ...schedulesRulers, SpecificScheduling: [] });
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

    // useEffect(() => {
    //     console.log(personalizedDayScheduling);
    // }, [personalizedDayScheduling])
    const showMessage = { display: "flex" } as const;

    const message = [
        "O valor de 'início' deve ser menor que o valor 'fim'!",
        "Você deve informar um dia!",
    ];

    return (
        <div className={style.containerPersonalizedDaySchedule}>
            <p>Escala em dia específico: <FaQuestionCircle /></p>
            {!personalizedDaySchedulingConfirmed &&
                <div className={style.containerInputsPersonalizedSchedule}>
                    <p>Dia:</p>
                    <input type="number"
                        name="personalizedScaleDay"
                        id="personalizedScaleDay"
                        className={style.choosePersonalizedDay}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onInput={inputNumberRule}
                        onBlur={inputNumberRule}
                        min={1}
                        max={daysMonthAmount}
                    />
                    <p>-</p>
                    <input type="time" name="personalizedScaleMin" id="personalizedScaleMin" value={daySchedulingMin} onChange={handleDayTimeChange} />
                    <p>Até</p>
                    <input type="time" name="personalizedScaleMax" id="personalizedScaleMax" value={daySchedulingMax} onChange={handleDayTimeChange} />
                    <input type="button" value="+ Adicionar" onClick={addDaysScheduling} />
                </div>
            }
            <ul className={style.personalizedDayList}>
                {personalizedDayScheduling.map((dayScheduling, index) => (
                    <li key={index}>
                        <p>Dia:</p>
                        <p className={style.intervalName}>{dayScheduling.day}</p>
                        <p>-</p>
                        <div>{dayScheduling.from}</div>
                        <p>Até</p>
                        <div>{dayScheduling.to}</div>
                        <input type="button" value="Remover" onClick={() => removeDaysScheduling(index)} style={buttonCondition} />
                    </li>
                ))}

            </ul>
            {!personalizedDaySchedulingConfirmed &&
                <input type="button" value="Confirmar" onClick={confirmDaysScheduling} />
            }

            {personalizedDaySchedulingConfirmed &&
                <input type="button" value="Cancelar" onClick={cancelDaysScheduling} />
            }

            {daySchedulingMin >= daySchedulingMax &&
                <Message message={message[0]} type={"alert"} display={showMessage} />
            }

            {choosedDay === 0 &&
                <Message message={message[1]} type={"alert"} display={showMessage} />
            }
        </div>
    )
}

export default SpecificScheduling;
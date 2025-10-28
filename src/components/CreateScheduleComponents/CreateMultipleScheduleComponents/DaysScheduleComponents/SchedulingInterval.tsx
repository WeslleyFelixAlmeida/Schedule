import style from "./SchedulingInterval.module.css";
import { FaQuestionCircle } from "react-icons/fa";
import type { schedulesRulers_props, schedulesRulers } from "../../../../Utils/Types";
import { useEffect, useState } from "react";

type checkedButtonsType = {
    button: number, checked: boolean
}

const buttonsArray = () => {
    let buttonsArray: checkedButtonsType[] = []
    buttonsArray.push({ button: 0, checked: true })
    buttonsArray.push({ button: 1, checked: false })
    return buttonsArray;
}

const buttonStyles = [
    { backgroundColor: "var(--dark_blue)", color: "var(--golden_fonts)" },
    { backgroundColor: "white", color: "var(--dark_blue)" }
];


const SchedulingInterval = (props: schedulesRulers_props) => {
    const [schedulingIntervalType, setSchedulingInterval] = useState<{
        time: number,
        type: "hour" | "minutes"
    }>(
        { time: 0, type: "minutes" }
    );

    const [checkedButton, setCheckedButton] = useState<checkedButtonsType[]>(buttonsArray());

    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

    const schedulesRulers = props.schedulesRulers;
    const setSchedulesRulers = props.setSchedulesRulers;

    const chooseButtonInterval = (e: any) => {
        const clickedButton = Number(e.target.id);
        let newButtonsArray: checkedButtonsType[] = [...checkedButton];

        checkedButton.map((button, index) => {
            if (index === clickedButton) {
                newButtonsArray[clickedButton] = { button: clickedButton, checked: true };
            }
            else {
                newButtonsArray[index] = { button: clickedButton, checked: false };
            }
        })
        setCheckedButton(newButtonsArray);

        switch (clickedButton) {
            case 0:
                setSchedulingInterval({ ...schedulingIntervalType, type: "minutes" });
                break
            case 1:
                setSchedulingInterval({ ...schedulingIntervalType, type: "hour" });
                break
        }
    }

    const inputNumberRule = (e: any) => {
        let value = e.currentTarget.value;
        if (value.length > 2) {
            e.currentTarget.value = value.slice(0, 2);
        }

        const num = Number(value);

        if (num > 23) { e.currentTarget.value = "23" };

        if (num === 0 && value.length === 1) { e.currentTarget.value = "1" };

        setSchedulingInterval(prev => ({ ...prev, time: num }));
    }

    const confirmScheduleInterval = () => {
        if (schedulingIntervalType.time > 0 &&
            (
                schedulingIntervalType.type === "minutes" ||
                schedulingIntervalType.type === "hour"
            )
        ) {
            setSchedulesRulers((prev: schedulesRulers) => ({
                ...prev,
                SchedulingIntervalType: schedulingIntervalType
            }));

            setIsConfirmed(true);
        }
    }

    useEffect(() => {
        // console.log(`schedulingIntervalType.type: ${schedulingIntervalType.type}`);
    }, [schedulingIntervalType])

    return (
        <div className={style.containerSchedulingInterval}>
            <h2>Informe o intervalo entre os horários: <FaQuestionCircle /></h2>
            {!isConfirmed &&
                <div className={style.schedulingIntervalButtons}>
                    <p>Intervalo em:</p>
                    <input type="button" value="Minuto(s)" id="0" key={0}
                        onClick={chooseButtonInterval}
                        style={checkedButton[0].checked ? buttonStyles[0] : buttonStyles[1]}
                    />
                    <input type="button" value="Hora(s)" id="1" key={1}
                        onClick={chooseButtonInterval}
                        style={checkedButton[1].checked ? buttonStyles[0] : buttonStyles[1]}
                    />
                </div>
            }
            {!isConfirmed &&
                <div className={style.schedulingIntervalAmount}>
                    <p>Tempo:</p>
                    <input type="number"
                        name="schedulingIntervalType"
                        id="schedulingIntervalType" 
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onInput={inputNumberRule}
                        onBlur={inputNumberRule}
                        min={1}
                        max={23}
                    />
                    {!isConfirmed &&
                        <input type="button" value="Confirmar" onClick={confirmScheduleInterval} />
                    }
                </div>
            }
            {isConfirmed &&
                <div className={style.containerShowSchedulingInterval}>
                    <p>Intervalo estabelecido:</p>
                    <p className={style.choosedSchedulingInterval}>{schedulingIntervalType.time} {schedulingIntervalType.type === "minutes" ? "Minuto(s)" : "Hora(s)"}</p>
                </div>}
        </div>
    )
}
export default SchedulingInterval;
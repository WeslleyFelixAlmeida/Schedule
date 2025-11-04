import style from "./Multiple_daysSchedule.module.css";
import { useEffect, useState, type ChangeEvent } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import GeneralDaysInterval from "./DaysScheduleComponents/GeneralDaysInterval";
import SpecificScheduling from "./DaysScheduleComponents/SpecificScheduling";
import DayInterval from "./DaysScheduleComponents/DayInterval";
import SchedulingInterval from "./DaysScheduleComponents/SchedulingInterval";
import type { schedulesRulers_props, schedulesRulers } from "../../../Utils/Types";

import Message from "../../Message";

type checkedButtonsType = {
    button: number, checked: boolean
}

const buttonsArray = () => {
    let buttonsArray: checkedButtonsType[] = []
    for (let i = 0; i <= 6; i++) {
        buttonsArray.push({ button: i, checked: false })
    }
    return buttonsArray;
}

const buttonStyles = [
    { backgroundColor: "var(--dark_blue)", color: "var(--golden_fonts)" },
    { backgroundColor: "white", color: "var(--dark_blue)" }
];

const Multiple_daysSchedule = (props: schedulesRulers_props) => {
    const [generalDaysContainer, setGeneralDaysContainer] = useState<boolean>(true);//deixar como false por padrão
    const [checkedButton, setCheckedButton] = useState<checkedButtonsType[]>(buttonsArray());
    const [scheduleHourBegin, setScheduleHourBegin] = useState<string>("00:00");
    const [scheduleHourEnd, setScheduleHourEnd] = useState<string>("00:00");
    const [scheduleIsConfirmed, setScheduleIsConfirmed] = useState<boolean>(false);//deixar como false por padrão

    const schedulesRulers = props.schedulesRulers;
    const setSchedulesRulers = props.setSchedulesRulers;

    const updateSchedIntervalType = (time: number, type: "minutes" | "hour") => {
        setSchedulesRulers((prev: schedulesRulers) => ({
            ...prev,
            SchedulingIntervalType: { time, type }
        }));
    };

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
        if (clickedButton !== 6) {
            setGeneralDaysContainer(false);
            switch (clickedButton) {
                case 0:
                    updateSchedIntervalType(5, "minutes");
                    break;
                case 1:
                    updateSchedIntervalType(10, "minutes");
                    break;
                case 2:
                    updateSchedIntervalType(15, "minutes");
                    break;
                case 3:
                    updateSchedIntervalType(30, "minutes");
                    break;
                case 4:
                    updateSchedIntervalType(45, "minutes");
                    break;
                case 5:
                    updateSchedIntervalType(1, "hour");
                    break;
            }
        }
        else {
            updateSchedIntervalType(0, "minutes");
            setGeneralDaysContainer(true);
        }
    }

    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "scheduleHourBegin") {
            setScheduleHourBegin(e.target.value);
        } else {
            setScheduleHourEnd(e.target.value);
        }
    };

    const scheduleIntervalConfirm = () => {
        if (scheduleIsConfirmed) {
            setScheduleHourBegin("00:00");
            setScheduleHourEnd("00:00");
            setSchedulesRulers((prev: schedulesRulers) => ({
                ...prev,
                SchedulingInterval: { from: "00:00", to: "00:00" }
            }));
            return setScheduleIsConfirmed(false);
        }

        if (!(scheduleHourBegin >= scheduleHourEnd)) {
            setScheduleIsConfirmed(true);
            setSchedulesRulers((prev: schedulesRulers) => ({
                ...prev,
                SchedulingInterval: { from: scheduleHourBegin, to: scheduleHourEnd }
            }));
        }
    }

    useEffect(() => {
        console.log(schedulesRulers.SchedulingIntervalType.time > 0);
    }, [schedulesRulers]);

    const showMessage = { display: "flex" } as const;

    const message = [
        "*É necessário estabelecer um horário de início e de fim!",
        "*É necessário estabelecer o intervalo padrão entre as escalas!",
        "O tempo de 'início' deve ser menor que o de 'fim'!"
    ];


    return (
        <div className={style.multipleDaysContainer}>
            <h2>
                Evento vai ocorrer entre os horários: <FaQuestionCircle />
                <p style={{ color: "red" }}>* </p>
            </h2>
            {!scheduleIsConfirmed &&
                <div className={style.containerSchedulingInterval}>
                    <input type="time" name="scheduleHourBegin" id="scheduleHourBegin" onChange={handleTimeChange} value={scheduleHourBegin} />
                    <p>Até</p>
                    <input type="time" name="scheduleHourEnd" id="scheduleHourEnd" onChange={handleTimeChange} value={scheduleHourEnd} />
                    <input type="button" value="Confirmar" onClick={scheduleIntervalConfirm} />
                </div>
            }

            {!scheduleIsConfirmed &&
                <Message message={message[0]} type={"alert"} display={showMessage} />
            }

            {scheduleHourBegin >= scheduleHourEnd &&
                <Message message={message[2]} type={"error"} display={showMessage} />
            }

            {scheduleIsConfirmed &&
                <div className={style.containerSchedulingIntervalChoosed}>
                    <p>Intervalo escolhido: </p>
                    <div>{scheduleHourBegin}</div>
                    <p>Até</p>
                    <div>{scheduleHourEnd}</div>
                    <input type="button" value="Cancelar" onClick={scheduleIntervalConfirm} />
                </div>
            }


            <div className={style.containerButtonsInterval}>
                <input type="button" value="5 Minutos" id="0" key={0}
                    onClick={chooseButtonInterval}
                    style={checkedButton[0].checked ? buttonStyles[0] : buttonStyles[1]}
                />
                <input type="button" value="10 Minutos" id="1" key={1}
                    onClick={chooseButtonInterval}
                    style={checkedButton[1].checked ? buttonStyles[0] : buttonStyles[1]}
                />
                <input type="button" value="15 Minutos" id="2" key={2}
                    onClick={chooseButtonInterval}
                    style={checkedButton[2].checked ? buttonStyles[0] : buttonStyles[1]}
                />
                <input type="button" value="30 Minutos" id="3" key={3}
                    onClick={chooseButtonInterval}
                    style={checkedButton[3].checked ? buttonStyles[0] : buttonStyles[1]}
                />
                <input type="button" value="45 Minutos" id="4" key={4}
                    onClick={chooseButtonInterval}
                    style={checkedButton[4].checked ? buttonStyles[0] : buttonStyles[1]}
                />
                <input type="button" value="1 Hora" id="5" key={5}
                    onClick={chooseButtonInterval}
                    style={checkedButton[5].checked ? buttonStyles[0] : buttonStyles[1]}
                />
                <input type="button" value="Personalizado" id="6" key={6}
                    onClick={chooseButtonInterval}
                    style={checkedButton[6].checked ? buttonStyles[0] : buttonStyles[1]}
                />
            </div>

            {schedulesRulers.SchedulingIntervalType.time < 1 &&
                <Message message={message[1]} type={"alert"} display={showMessage} />
            }

            {generalDaysContainer &&
                (
                    [
                        <SchedulingInterval key={0} schedulesRulers={props.schedulesRulers} setSchedulesRulers={props.setSchedulesRulers} />,
                        <GeneralDaysInterval key={1} schedulesRulers={props.schedulesRulers} setSchedulesRulers={props.setSchedulesRulers} />,
                        <DayInterval key={2} schedulesRulers={props.schedulesRulers} setSchedulesRulers={props.setSchedulesRulers} />,
                        <SpecificScheduling key={3} schedulesRulers={props.schedulesRulers} setSchedulesRulers={props.setSchedulesRulers} />
                    ]
                )
            }

        </div>

    )
}

export default Multiple_daysSchedule;
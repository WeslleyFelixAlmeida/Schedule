import style from "./CreateMultipleSchedule.module.css";
import { useEffect, useState } from "react";
import type { DaySchedule, schedulesRulers } from "../../Utils/Types";
import Multiple_dayContainer from "./CreateMultipleScheduleComponents/Multiple_daysContainer";
import Multiple_daysSchedule from "./CreateMultipleScheduleComponents/Multiple_daysSchedule";
import Message from "../Message";

const getTimeInMinutes = (hour: string) => {
    const getTimeHourAndMinutes = hour.split(":");
    const conversion = (Number(getTimeHourAndMinutes[0]) * 60) + Number(getTimeHourAndMinutes[1]);

    return conversion;
}

const CreateMultipleSchedule = () => {
    const [userSchedules, setUserSchedules] = useState<DaySchedule[]>([]);

    const [schedulesRulers, setSchedulesRulers] = useState<schedulesRulers>({
        SchedulingInterval: { from: "00:00", to: "00:00" },
        SchedulingIntervalType: { time: 0, type: "hour" },
        GeneralDaysInterval: [],
        DayInterval: [],
        SpecificScheduling: []
    });

    // useEffect(() => {
    // console.log(`Mudou! ${userSchedules}`);
    // }, [userSchedules])

    const [message, setMessage] = useState<{ message: string, display: "flex" | "none" }>({ message: "", display: "none" });

    const showMessage = (message: string) => {
        setMessage({
            message: message,
            display: "flex",
        });

        const timeout = setTimeout(() => setMessage({
            message: "",
            display: "none",
        }), 3000);
    }

    const errorMessages = [
        "Erro ao criar tarefa, verifique se todas as informações obrigatórias foram preenchidas!"
    ];

    const checkEventCreateConditions = () => {
        if (schedulesRulers.SchedulingInterval.from >= schedulesRulers.SchedulingInterval.to) {
            showMessage(errorMessages[0]);
            return false;
        } else if (!userSchedules.some(userSchedule => userSchedule.checked)) {
            showMessage(errorMessages[0]);
            return false;
        } else if (schedulesRulers.SchedulingIntervalType.time < 1) {
            showMessage(errorMessages[0]);
            return false;
        }

        createSchedulesArray();
        return true;
    }

    const createSchedulesArray = () => {
        const choosedDays = userSchedules.filter(userSchedule => userSchedule.checked);
        let newDaysArray: Pick<DaySchedule, "day" | "schedules">[] = [];

        //Pegando o valor de inicio e fim geral e formatando para número e transformando em minutos:
        const SchedIntervalFrom = getTimeInMinutes(schedulesRulers.SchedulingInterval.from);
        const SchedIntervalTo = getTimeInMinutes(schedulesRulers.SchedulingInterval.to);

        //Pegando o tempo de intervalo entre os horários:
        const getInvertalTime = Number(schedulesRulers.SchedulingIntervalType.time);

        //Formatando este tempo de intervalo caso seja em horas para minutos:
        const intervalTimeFormated = schedulesRulers.SchedulingIntervalType.type === "hour" ? getInvertalTime * 60 : getInvertalTime;

        choosedDays.forEach((day, index) => {
            let scheduleDayArray = [];
            let controlLooping = SchedIntervalFrom;

            while (controlLooping <= SchedIntervalTo) {
                if ((controlLooping % intervalTimeFormated) === 0) {
                    scheduleDayArray.push(controlLooping);
                }
                controlLooping += intervalTimeFormated;
            }

            newDaysArray.push({ day: day.day, schedules: scheduleDayArray });

            //Escala em dia específico
            if (schedulesRulers.SpecificScheduling.length > 0) {
                schedulesRulers.SpecificScheduling.forEach((specific) => {
                    const specificFrom = getTimeInMinutes(specific.from);
                    const specificTo = getTimeInMinutes(specific.to);

                    const dayIndex = newDaysArray.findIndex(d => d.day === specific.day);

                    if (dayIndex !== -1) {
                        let newSchedules: number[] = [];
                        let controlTime = specificFrom;

                        const interval = schedulesRulers.SchedulingIntervalType.type === "hour"
                            ? Number(schedulesRulers.SchedulingIntervalType.time) * 60
                            : Number(schedulesRulers.SchedulingIntervalType.time);

                        while (controlTime <= specificTo) {
                            newSchedules.push(controlTime);
                            controlTime += interval;
                        }

                        newDaysArray[dayIndex].schedules = newSchedules;
                    }
                });
            }

            //Intervalo(s) gerais
            if (schedulesRulers.GeneralDaysInterval.length > 0) {
                schedulesRulers.GeneralDaysInterval.forEach((day, i) => {
                    let intervalInit = getTimeInMinutes(schedulesRulers.GeneralDaysInterval[i].from);
                    let intervalEnd = getTimeInMinutes(schedulesRulers.GeneralDaysInterval[i].to);

                    let applyInterval = newDaysArray[index].schedules.filter((schedule) => (
                        (schedule as number) < intervalInit || (schedule as number) >= intervalEnd
                    ));

                    newDaysArray[index].schedules = applyInterval as number[];
                });
            }

            //Intervalo em dia específico
            if (schedulesRulers.DayInterval.length > 0) {
                schedulesRulers.DayInterval.forEach((interval) => {
                    const intervalInit = getTimeInMinutes(interval.from);
                    const intervalEnd = getTimeInMinutes(interval.to);

                    const dayIndex = newDaysArray.findIndex(d => d.day === interval.day);

                    if (dayIndex !== -1) {
                        const applyInterval = newDaysArray[dayIndex].schedules.filter((schedule) =>
                            (schedule as number) < intervalInit || (schedule as number) >= intervalEnd
                        );

                        newDaysArray[dayIndex].schedules = applyInterval as number[];
                    }
                });
            }
        });
    }

    return (
        <div className={style.containerMultipleScheduleEvent}>
            <div className={style.containerTitleCreateButton}>
                <h2>Evento de escala múltipla:</h2>
                <input type="button" value="Criar Evento" onClick={checkEventCreateConditions} />
            </div>

            <p>* Obrigatórias</p>

            <div className={style.errorContainer}>
                <Message message={message.message} type={"error"} display={{ display: message.display }} />
            </div>

            <Multiple_dayContainer days={userSchedules} setDays={setUserSchedules} />
            <Multiple_daysSchedule schedulesRulers={schedulesRulers} setSchedulesRulers={setSchedulesRulers} />
        </div>
    )
}

export default CreateMultipleSchedule;
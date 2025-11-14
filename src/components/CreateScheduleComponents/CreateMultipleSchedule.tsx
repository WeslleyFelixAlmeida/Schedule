import style from "./CreateMultipleSchedule.module.css";
import { useEffect, useState } from "react";
import type { DaySchedule, schedulesRulers } from "../../Utils/Types";
import Multiple_dayContainer from "./CreateMultipleScheduleComponents/Multiple_daysContainer";
import Multiple_daysSchedule from "./CreateMultipleScheduleComponents/Multiple_daysSchedule";
import Message from "../Message";
import ShowSchedulesResume from "./CreateMultipleScheduleComponents/ShowSchedulesOverview";
import { disableScroll, enableScroll } from "../../Utils/UtilsFunctions";
import { MdUploadFile } from "react-icons/md";


const getTimeInMinutes = (hour: string) => {
    const getTimeHourAndMinutes = hour.split(":");
    const conversion = (Number(getTimeHourAndMinutes[0]) * 60) + Number(getTimeHourAndMinutes[1]);

    return conversion;
}

const getTimeInHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const conversion = `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;

    return conversion;
}

type ScheduleInfo_type = {
    eventImage: string;
    eventName: string;
    eventShortDesc: string;
    eventLongDesc: string;
}

const CreateMultipleSchedule = () => {
    const [userSchedulesEventFormated, setUserSchedulesEventFormated] = useState<Pick<DaySchedule, "schedules" | "day">[]>([]);

    const [userSchedules, setUserSchedules] = useState<DaySchedule[]>([]);

    const [schedulesRulers, setSchedulesRulers] = useState<schedulesRulers>({
        SchedulingInterval: { from: "00:00", to: "00:00" },
        SchedulingIntervalType: { time: 0, type: "hour" },
        GeneralDaysInterval: [],
        DayInterval: [],
        SpecificScheduling: []
    });

    const [scheduleInfo, setScheduleInfo] = useState<ScheduleInfo_type>({ eventImage: "", eventName: "", eventShortDesc: "", eventLongDesc: "" });

    const [showResume, setShowResume] = useState<{ display: "flex" } | { display: "none" }>({ display: "flex" });

    const [message, setMessage] = useState<{ message: string, display: "flex" | "none" }>({ message: "", display: "none" });

    const handleChanges = (e: any) => {
        const { id, value, files, type } = e.target as HTMLInputElement;

        if (type === "file" && files && files.length > 0) {
            const file = files[0];

            const fileURL = URL.createObjectURL(file);

            setScheduleInfo((prev) => ({
                ...prev,
                [id]: fileURL,
            }));

            return;
        }

        setScheduleInfo(prev => ({
            ...prev,
            [id]: value
        }));
    }

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
        "Erro ao criar tarefa, verifique se todos os campos obrigatórios foram preenchidos!"
    ];

    const checkEventCreateConditions = () => {
        if ((!scheduleInfo.eventImage) ||
            (!scheduleInfo.eventShortDesc) ||
            (!scheduleInfo.eventLongDesc) ||
            (!scheduleInfo.eventName)
        ) {
            showMessage(errorMessages[0]);
            return false;
        }

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
    }

    const createSchedulesArray = () => {
        const choosedDays = userSchedules.filter(userSchedule => userSchedule.checked);
        let newDaysArray: Pick<DaySchedule, "day" | "schedules">[] = [];

        //Pegando o valor de inicio e fim geral e Eventatando para número e transEventando em minutos:
        const SchedIntervalFrom = getTimeInMinutes(schedulesRulers.SchedulingInterval.from);
        const SchedIntervalTo = getTimeInMinutes(schedulesRulers.SchedulingInterval.to);

        //Pegando o tempo de intervalo entre os horários:
        const getInvertalTime = Number(schedulesRulers.SchedulingIntervalType.time);

        //Eventatando este tempo de intervalo caso seja em horas para minutos:
        const intervalTimeEventated = schedulesRulers.SchedulingIntervalType.type === "hour" ? getInvertalTime * 60 : getInvertalTime;

        choosedDays.forEach((day, index) => {
            let scheduleDayArray = [];
            let controlLooping = SchedIntervalFrom;

            while (controlLooping <= SchedIntervalTo) {
                if ((controlLooping % intervalTimeEventated) === 0) {
                    scheduleDayArray.push(controlLooping);
                }
                controlLooping += intervalTimeEventated;
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
        });

        //Convertendo novamente para horas as escalas:
        let userSchedulesConversion: Pick<DaySchedule, "schedules" | "day">[] = []

        newDaysArray.map((day, i) => {
            let array: string[] = []

            day.schedules.map((schedule, j) => {
                array.push(getTimeInHours(schedule as number));
            });

            userSchedulesConversion.push({
                ...day,
                schedules: array
            });
        });

        setUserSchedulesEventFormated(userSchedulesConversion);
        disableScroll();
        setShowResume({ display: "flex" })
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

            <div className={`${style.containerEventImage}`}>
                <p>Imagem do evento: <span style={{ color: "red" }}>* </span></p>
                <label htmlFor="eventImage">
                    <MdUploadFile />
                    Clique aqui para adicionar
                </label>
                <input type="file" name="eventImage" id="eventImage" accept="image/*" onChange={handleChanges} />
                {scheduleInfo.eventImage && (
                    <img src={scheduleInfo.eventImage} alt="Pré-visualização" />
                )}
            </div>

            <div className={`${style.containerMultipleLine}`}>
                <p>Nome: <span style={{ color: "red" }}>* </span></p>
                <input type="text" name="eventName" id="eventName" placeholder="Nome do evento" onChange={handleChanges} value={scheduleInfo.eventName} />
            </div>

            <div className={`${style.containerMultipleLine}`}>
                <p>Descrição curta: <span style={{ color: "red" }}>* </span></p>
                <input type="text" name="eventShortDesc" id="eventShortDesc" placeholder="Descrição curta" onChange={handleChanges} value={scheduleInfo.eventShortDesc} />
            </div>

            <div className={`${style.containerMultipleLine}`}>
                <p>Descrição longa: <span style={{ color: "red" }}>* </span></p>
                <textarea name="eventLongDesc" id="eventLongDesc" placeholder="Descrição longa" onChange={handleChanges} value={scheduleInfo.eventLongDesc}></textarea>
            </div>

            <Multiple_dayContainer days={userSchedules} setDays={setUserSchedules} />
            <Multiple_daysSchedule schedulesRulers={schedulesRulers} setSchedulesRulers={setSchedulesRulers} />


            {userSchedulesEventFormated.length > 0 &&
                <ShowSchedulesResume userSchedules={userSchedulesEventFormated} setUserSchedules={setUserSchedulesEventFormated} showResume={showResume} setShowResume={setShowResume} />
            }
            {/* Container de resumo ^^ */}
        </div>
    )
}

export default CreateMultipleSchedule;
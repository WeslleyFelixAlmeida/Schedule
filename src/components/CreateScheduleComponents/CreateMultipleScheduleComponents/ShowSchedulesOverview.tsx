import style from "./ShowSchedulesOverview.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import type { DaySchedule } from "../../../Utils/Types";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { timeOut } from "../../../Utils/UtilsFunctions";
import { API_URL } from "../../../config";

type ShowSchedulesOverview_props = {
    userSchedules: Pick<DaySchedule, "schedules" | "day">[]
    setUserSchedules: Function;
    showResume: { display: "flex" } | { display: "none" };
    setShowResume: Function;
    scheduleInfo: { eventImage: string, eventName: string, eventShortDesc: string, eventLongDesc: string }
}

const ShowSchedulesOverview = (props: ShowSchedulesOverview_props) => {
    const [listIndex, setListIndex] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<boolean>(false);

    const userSchedules = props.userSchedules;
    const setUserSchedules = props.setUserSchedules;
    const scheduleInfo = props.scheduleInfo;

    const removeDay = (ScheduleDayIndex: number, scheduleHour: string
    ) => {
        let newArray: Pick<DaySchedule, "schedules" | "day">[] = [...userSchedules];

        userSchedules.map((day, i) => {
            if (ScheduleDayIndex === i) {
                day.schedules.map((schedule, j) => {
                    if (schedule === scheduleHour) {
                        newArray[i].schedules.splice(j, 1);
                    }
                });
            }
        });

        setUserSchedules(newArray);
    }

    const cancel = () => {
        props.setShowResume({ display: "none" });
    }

    const goAhead = () => {
        if (listIndex !== userSchedules.length - 1) {
            setListIndex((listIndex + 1));
        }
    }

    const goBack = () => {
        if (listIndex !== 0) {
            setListIndex((listIndex - 1));
        }
    }

    const confirm = () => {
        //Função que vai fazer a request para API para criar o evento!
        const eventData = { days: [...userSchedules], ...scheduleInfo };
        let isValidated = false;

        eventData.days.map((day) => {
            if (day.schedules.length > 0) {
                isValidated = true;
            }
        });

        if (!isValidated) {
            setErrorMessage(true);
            timeOut(() => setErrorMessage(false), 3000);

            return null;
        }

        console.log("Existem escalas!");
        console.log(eventData);
        fetch(`${API_URL}/event/create/multiple`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(eventData)
        })
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.log(err));
    }


    return (
        <div className={style.containerOverviewPage} style={props.showResume}>
            <div className={style.containerOverviewContent}>
                <div className={style.containerTopPreview}>
                    {errorMessage &&
                        <p className={style.errorMessage}>Erro ao criar tarefa, verifique se há escalas nos dias apresentados.</p>
                    }
                    <h2>Verifique as escalas que serão criadas:</h2>
                    <div className={style.containerConfirmAndCancel}>
                        <input type="button" value="Cancelar" onClick={cancel} />
                        <input type="button" value="Confirmar" onClick={confirm} />
                    </div>
                </div>

                <div className={style.containerChangeDayButtons}>
                    <button onClick={goBack}>
                        <IoIosArrowBack />
                    </button>

                    <h2>Escalas do dia: <span>{userSchedules[listIndex].day}</span></h2>

                    <button onClick={goAhead}>
                        <IoIosArrowForward />
                    </button>
                </div>
                <div className={style.containerOverviewList}>

                    <ul className={style.overviewMultipleSchedulesList}>
                        {
                            userSchedules[listIndex].schedules.map((schedule, index) => (
                                <li key={index}>
                                    <p>{schedule}</p>
                                    <button onClick={() => removeDay(listIndex, schedule as string)}>
                                        <FaRegTrashAlt />
                                    </button>
                                </li>
                            ))
                        }
                    </ul>

                </div>
            </div>
        </div>
    )
}
export default ShowSchedulesOverview;
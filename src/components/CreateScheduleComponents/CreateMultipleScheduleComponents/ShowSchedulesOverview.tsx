import style from "./ShowSchedulesOverview.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import type { DaySchedule } from "../../../Utils/Types";
import { daysMonthAmount, currentDay } from "../../ScheduleDetailsComponents/Date";
import { enableScroll } from "../../../Utils/UtilsFunctions";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";

type ShowSchedulesOverview_props = {
    userSchedules: Pick<DaySchedule, "schedules" | "day">[]
    setUserSchedules: Function;
    showResume: { display: "flex" } | { display: "none" };
    setShowResume: Function;
}


const ShowSchedulesOverview = (props: ShowSchedulesOverview_props) => {
    const [listIndex, setListIndex] = useState<number>(0);
    
    const userSchedules = props.userSchedules;
    const setUserSchedules = props.setUserSchedules;

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
        enableScroll();
        props.setShowResume({ display: "none" });
    }

    const confirm = () => {
        console.log("confirmado!");
        //Função que vai fazer a request para API para criar o evento!
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

    return (
        <div className={style.containerOverviewPage} style={props.showResume}>
            <div className={style.containerOverviewContent}>
                <h2>Verifique as escalas que serão criadas:</h2>
                <div className={style.containerConfirmAndCancel}>
                    <input type="button" value="Cancelar" onClick={cancel} />
                    <input type="button" value="Confirmar" onClick={confirm} />
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
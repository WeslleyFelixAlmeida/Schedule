import style from "./ShowSchedulesOverview.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import type { DaySchedule } from "../../../Utils/Types";
import { daysMonthAmount, currentDay } from "../../ScheduleDetailsComponents/Date";
import { enableScroll } from "../../../Utils/UtilsFunctions";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

type ShowSchedulesOverview_props = {
    userSchedules: Pick<DaySchedule, "schedules" | "day">[]
    setUserSchedules: Function;
    showResume: { display: "flex" } | { display: "none" };
    setShowResume: Function;
}



const ShowSchedulesOverview = (props: ShowSchedulesOverview_props) => {
    const [listIndex, setListIndex] = useState<number>(0);

    const userSchedules = props.userSchedules;
    // const setUserSchedules = props.setUserSchedules;

    // const removeDay = (day: number, schedule: string) => {

    //     // setUserSchedules() usar isso para remover o dia após criar um novo array
    // }

    const removeDay = (scheduleId: number, ScheduleDay: number
    ) => {
        console.log(`scheduleId: ${scheduleId}`);
        console.log(`ScheduleDay: ${ScheduleDay}`);
    }

    const cancel = () => {
        enableScroll();
        props.setShowResume({ display: "none" });
    }

    const confirm = () => {
        console.log("confirmado!");
    }

    const goAhead = () => {
        console.log("Foi para frente!");
    }

    const goBack = () => {
        console.log("Foi para trás!");
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

                    <h2>Escalas do dia: <span>{userSchedules[0].day}</span></h2>

                    <button onClick={goAhead}>
                        <IoIosArrowForward />
                    </button>
                </div>
                <div className={style.containerOverviewList}>

                    <ul className={style.overviewMultipleSchedulesList}>
                        {
                            userSchedules[0].schedules.map((schedule, index) => (
                                <li key={index}>
                                    <p>{schedule}</p>
                                    <button onClick={() => removeDay(index, listIndex)}>
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
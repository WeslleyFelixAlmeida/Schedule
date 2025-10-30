import { useEffect, useState } from "react";
import style from "./CreateMultipleSchedule.module.css";
import Multiple_dayContainer from "./CreateMultipleScheduleComponents/Multiple_daysContainer";
import Multiple_daysSchedule from "./CreateMultipleScheduleComponents/Multiple_daysSchedule";

import type { DaySchedule, schedulesRulers } from "../../Utils/Types";


const CreateMultipleSchedule = () => {
    //Checar se há ao menos 1 dia como checked, se houver ir pra frente se não apresentar uma mensagem de erro. Fazer o mesmo para o schedulesRulers!
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

    return (
        <div className={style.containerMultipleScheduleEvent}>
            <h2>Evento de escala múltipla:</h2>
            <Multiple_dayContainer days={userSchedules} setDays={setUserSchedules} />
            <Multiple_daysSchedule schedulesRulers={schedulesRulers} setSchedulesRulers={setSchedulesRulers} />
        </div>
    )
}

export default CreateMultipleSchedule;
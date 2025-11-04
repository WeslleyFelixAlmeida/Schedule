import { useEffect, useState } from "react";
import style from "./CreateMultipleSchedule.module.css";
import Multiple_dayContainer from "./CreateMultipleScheduleComponents/Multiple_daysContainer";
import Multiple_daysSchedule from "./CreateMultipleScheduleComponents/Multiple_daysSchedule";

import type { DaySchedule, schedulesRulers } from "../../Utils/Types";
import Message from "../Message";

const createEvent = (data: schedulesRulers, days: DaySchedule[]) => {
    console.log(data);
    console.log(days);
}

const CreateMultipleSchedule = () => {
    //Checar se há ao menos 1 dia como checked, se houver ir pra frente se não apresentar uma mensagem de erro. Fazer o mesmo para o schedulesRulers!
    const [userSchedules, setUserSchedules] = useState<DaySchedule[]>([]);

    const [schedulesRulers, setSchedulesRulers] = useState<schedulesRulers>({
        SchedulingInterval: { from: "00:00", to: "00:00" },//
        SchedulingIntervalType: { time: 0, type: "hour" },//
        GeneralDaysInterval: [],
        DayInterval: [],
        SpecificScheduling: []
    });

    /*
    Estas 2 propriedades devem ter algum valor para poder criar a tarefa!:
        > SchedulingInterval
        > SchedulingIntervalType
    */

    // const [checkValidation, setCheckValidation] = useState<{ days: boolean, SchedulingInterval: boolean, SchedulingIntervalType: boolean, GeneralDaysInterval: boolean }>(
    //     {
    //         days: false,
    //         SchedulingInterval: false,
    //         SchedulingIntervalType: false,
    //         GeneralDaysInterval: false
    //     }
    // );

    // useEffect(() => {
    // console.log(`Mudou! ${userSchedules}`);
    // }, [userSchedules])

    const [showMessage, setShowMessage] = useState<boolean>(false);

    const message = [
        "Erro ao criar tarefa, verifique se todas as informações obrigatórias foram preenchidas!"
    ];

    return (
        <div className={style.containerMultipleScheduleEvent}>
            <div className={style.containerTitleCreateButton}>
                <h2>Evento de escala múltipla:</h2>
                <input type="button" value="Criar Evento" onClick={() => createEvent(schedulesRulers, userSchedules)} />
            </div>
            <p>* Obrigatorías</p>

            <p style={{ color: "red" }}>* </p>

            {showMessage &&
                <Message message={message[0]} type={"error"} display={{ display: "flex" }} />
            }

            <Multiple_dayContainer days={userSchedules} setDays={setUserSchedules} />
            <Multiple_daysSchedule schedulesRulers={schedulesRulers} setSchedulesRulers={setSchedulesRulers} />
        </div>
    )
}

export default CreateMultipleSchedule;
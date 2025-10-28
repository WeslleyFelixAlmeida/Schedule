import { FaQuestionCircle } from "react-icons/fa";
import style from "./SpecificScheduling.module.css";
import type { schedulesRulers_props } from "../../../../Utils/Types";

const inputNumberRule = (e: any) => {
    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
}

const SpecificScheduling = (props: schedulesRulers_props) => {
    const schedulesRulers = props.schedulesRulers;
    const setSchedulesRulers = props.setSchedulesRulers;

    return (
        <div className={style.containerPersonalizedDaySchedule}>
            <p>Escala em dia específico: <FaQuestionCircle /></p>
            <div className={style.containerInputsPersonalizedSchedule}>
                <p>Dia:</p>
                <input type="number"
                    name="personalizedScaleDay"
                    id="personalizedScaleDay"
                    className={style.choosePersonalizedDay}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onInput={inputNumberRule}
                />
                <p>-</p>
                <input type="time" name="personalizedScaleMin" id="personalizedScaleMin" />
                <p>Até</p>
                <input type="time" name="personalizedScaleMax" id="personalizedScaleMax" />
                <input type="button" value="+ Adicionar" />
            </div>
            <ul className={style.personalizedDayList}>
                {/* Aqui vão os intervalos como li */}
                {Array.from({ length: 3 }, (_, i) => (//Apagar depois
                    <li key={i}>
                        <p>Dia:</p>
                        <p className={style.intervalName}>{i}</p>
                        <p>-</p>
                        <div>13:30</div>
                        <p>Até</p>
                        <div>14:30</div>
                        <input type="button" value="Remover" />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SpecificScheduling;
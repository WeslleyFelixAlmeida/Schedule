import style from "./CreateMultipleSchedule.module.css";
import Multiple_dayContainer from "./CreateMultipleScheduleComponents/Multiple_daysContainer";

type CreateMultipleSchedule_props = {

}

const CreateMultipleSchedule = (props: CreateMultipleSchedule_props) => {
    return (
        <div className={style.containerMultipleScheduleEvent}>
            <h2>Evento de escala múltipla:</h2>
            <Multiple_dayContainer />
        </div>
    )
}

export default CreateMultipleSchedule;
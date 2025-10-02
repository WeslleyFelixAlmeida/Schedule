import style from "./ScheduleLine_choosed.module.css";

type ScheduleLine_choosed_props = {
    hour: string;
    buttonFunction: Function;
}

const ScheduleLine_choosed = (props: ScheduleLine_choosed_props) => {
    return (
        <li className={style.choosedScheduleContainer}>
            <div className={style.hourChoosedSchedule}>
                <p>{props.hour}</p>
            </div>
            <div className={style.textChoosedSchedule}>
                <p>VOCÊ ESCOLHEU ESTE HORÁRIO!</p>
                <input type="button" value="Cancelar" onClick={() => { props.buttonFunction() }} />
            </div>
        </li>
    )
}

export default ScheduleLine_choosed;
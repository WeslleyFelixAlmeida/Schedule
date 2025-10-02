import style from "./ScheduleLine_open.module.css";

type ScheduleLine_open_props = {
    buttonFunction: Function;
    hour: string;
}

const ScheduleLine_open = (props: ScheduleLine_open_props) => {
    return (
        <li className={style.openScheduleContainer}>
            <p>{props.hour}</p>
            <input type="button" value="Escolher" onClick={() => { props.buttonFunction() }} />
        </li>
    )
}

export default ScheduleLine_open;
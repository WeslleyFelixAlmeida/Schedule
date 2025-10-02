import style from "./ScheduleLine_occupied.module.css";

type ScheduleLine_occupied_props = {
    hour: string;
}

const ScheduleLine_occupied = (props: ScheduleLine_occupied_props) => {
    return (
        <li className={style.occupiedScheduleContainer}>
            <div className={style.hourOccupiedSchedule}>
                <p>{props.hour}</p>
            </div>
            <div className={style.textOccupiedSchedule}>
                <p>OCUPADO</p>
            </div>
        </li>
    )
}

export default ScheduleLine_occupied;
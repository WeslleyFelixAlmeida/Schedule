import EventCard from "../components/EventCard";
import style from "./Schedule.module.css";

const Schedules = () => {
    return (
        <div className={style.containerSchedules}>
            <EventCard/>
        </div>
    )
}

export default Schedules;
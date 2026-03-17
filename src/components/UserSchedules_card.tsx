import style from "./UserSchedules_card.module.css";

type UserSchedules_card_props = {
    schedule: string
    date: string
    buttonFunction: Function;
    name: string;
}

const UserSchedules_card = (props: UserSchedules_card_props) => {
    return (
        <li className={style.choosedScheduleContainer}>
            <div className={style.hourChoosedSchedule}>
                <p>{props.date}</p>
                <p>{props.schedule}</p>
            </div>
            <div className={style.textChoosedSchedule}>
                <p>{props.name}</p>
                <input type="button" value="Cancelar" onClick={() => { props.buttonFunction() }} />
            </div>
        </li>
    )
}
export default UserSchedules_card;
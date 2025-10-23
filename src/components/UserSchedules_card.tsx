import style from "./UserSchedules_card.module.css";

type UserSchedules_card_props = {
    eventHour: string
    eventDate: string
    buttonFunction: Function;
    title: string; //Vai vir da API também
}

const UserSchedules_card = (props: UserSchedules_card_props) => {
    const eventDate = new Date(props.eventDate);
    const formatedDate = `${String(eventDate.getDate()).padStart(2, "0")}/${String(eventDate.getMonth() + 1).padStart(2, "0")}/${String(eventDate.getFullYear() % 100).padStart(2, "0")}`;

    return (
        <li className={style.choosedScheduleContainer}>
            <div className={style.hourChoosedSchedule}>
                <p>{formatedDate}</p>
                <p>{props.eventHour}</p>
            </div>
            <div className={style.textChoosedSchedule}>
                <p>{props.title}</p>
                {/* Isso deve vir da API também ^^^ */}
                <input type="button" value="Cancelar" onClick={() => { props.buttonFunction() }} />
            </div>
        </li>
    )
}
export default UserSchedules_card;
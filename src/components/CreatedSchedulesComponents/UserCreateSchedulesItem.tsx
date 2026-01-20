import style from "./UserCreateSchedulesItem.module.css";

type eventType = {
    id: number
    name: string;
    shortDescription: string;
    currentStatus: "CLOSED" | "OPEN";
    type: "MULTIPLE" | "UNIQUE";
    currentAmount: number;
    maxAmount: number;
    isParticipating: boolean;
    image: string;
}

type UserCreateSchedulesItemProps = {
    eventData: eventType;
    setCurrentEventData: Function;
    setShowParticipants: Function;
}

const UserCreateSchedulesItem = (props: UserCreateSchedulesItemProps) => {
    return (
        <li className={style.createdSchedulesItem}>
            <p>{props.eventData.name}</p>
            <div className={style.containerImage}
            >
                <div className={style.image}
                    style={{
                        backgroundImage: `url(${props.eventData.image})`
                    }}
                ></div>
                <div className={style.containerButtons}>
                    <input type="button" value="Ver participantes"
                        onClick={
                            () => {
                                props.setCurrentEventData({
                                    id: props.eventData.id,
                                    type: props.eventData.type
                                });
                                props.setShowParticipants(true);
                            }
                        } />
                    <input type="button" value="Detalhes" />
                </div>
            </div>
        </li>
    )
}

export default UserCreateSchedulesItem;
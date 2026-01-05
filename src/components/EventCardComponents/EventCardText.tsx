import style from "./../EventCard.module.css";

type EventCardTextProps = {
    title: string;
    shortDescription: string;
}

const EventCardText = (props: EventCardTextProps) => {
    return (
        <div className={style.containerText}>
            <h2>{props.title}</h2>
            <p>{props.shortDescription}</p>
        </div>
    )
}

export default EventCardText;
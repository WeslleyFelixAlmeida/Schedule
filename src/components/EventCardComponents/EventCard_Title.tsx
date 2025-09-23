import style from "./../EventCard.module.css";

type EventCard_titleProps = {
    title: string;
    shortDescription: string;
}

const EventCard_title = (props: EventCard_titleProps) => {
    return (
        <div className={style.containerText}>
            <h1>{props.title}</h1>
            <p>{props.shortDescription}</p>
        </div>
    )
}
export default EventCard_title;
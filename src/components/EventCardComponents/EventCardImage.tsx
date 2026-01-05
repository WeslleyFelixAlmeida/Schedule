import style from "./../EventCard.module.css";

type EventCardAmountProps = {
    imgUrl: Base64URLString | string;
}

const EventCardImage = (props: EventCardAmountProps) => {
    return (
        <div className={style.containerImage}>
            <img src={props.imgUrl} alt="imagem do evento" />
        </div>
    )
}

export default EventCardImage;
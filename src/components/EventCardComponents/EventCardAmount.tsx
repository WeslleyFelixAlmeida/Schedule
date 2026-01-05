import style from "./../EventCard.module.css";

type EventCardAmountProps = {
    currentAmount: number;
    maxAmount: number;
}

const EventCardAmount = (props: EventCardAmountProps) => {
    return (
        <div className={style.containerAmount}>
            <div className={`${style.AmountCircle} ${style.StatusAndAmountCircle}`}></div>
            <p><span>{props.currentAmount}/{props.maxAmount}</span> Pessoas</p>
        </div>
    )
}

export default EventCardAmount;
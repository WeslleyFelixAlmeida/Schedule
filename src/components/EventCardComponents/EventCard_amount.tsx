import style from "./../EventCard.module.css";

type EventCard_amountProps = {
    currentAmount: number
    maxAmount: number
}

const EventCard_amount = (props: EventCard_amountProps) => {
    return (
        <div className={style.containerAmount}>
            <div className={`${style.AmountCircle} ${style.StatusAndAmountCircle}`}></div>
            <p><span>{props.currentAmount}/{props.maxAmount}</span> Pessoas</p>
        </div>
    )
}

export default EventCard_amount;
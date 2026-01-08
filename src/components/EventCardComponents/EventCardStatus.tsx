import style from "./../EventCard.module.css";

type PossibleStatus = "OPEN" | "CLOSED";

type EventCard_statusProps = {
    currentStatus: PossibleStatus;
}

type StatusInformations = [
    {
        color: string;
        backgroundColor: string;
        borderColor: string;
    },
    { color: string, },
    { text: string }
];


function chooseStatus(type: PossibleStatus): StatusInformations {
    switch (type) {
        case "OPEN":
            return [
                { color: "green", backgroundColor: "green", borderColor: "green" },
                { color: "green" },
                { text: "Com vagas"}
            ];
        case "CLOSED":
            return [
                { color: "red", backgroundColor: "red", borderColor: "red" },
                { color: "red" },
                { text: "Finalizado"}
            ];
        default:
            return [
                { color: "gray", backgroundColor: "gray", borderColor: "gray" },
                { color: "gray" },
                { text: "Indisponível"}
            ];
    }
}

const EventCardStatus = (props: EventCard_statusProps) => {
    const statusInformations: StatusInformations = chooseStatus(props.currentStatus);

    return (
        <div className={style.containerStatus}>
            <div className={style.StatusAndAmountCircle} style={statusInformations[0]}></div>
            <p style={statusInformations[1]}>{statusInformations[2].text}</p>
        </div>
    )
}

export default EventCardStatus;
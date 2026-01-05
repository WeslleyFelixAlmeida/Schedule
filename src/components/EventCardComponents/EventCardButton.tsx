import Button from "./../Button";

type EventCardButtonProps = {
    buttonType: "cancel" | "details" | "join";
    buttonFunction: Function;
}

const EventCardButton = (props: EventCardButtonProps) => {
    return (
        <Button buttonFunction={() => props.buttonFunction()} buttons={props.buttonType}/>
    );
}

export default EventCardButton;
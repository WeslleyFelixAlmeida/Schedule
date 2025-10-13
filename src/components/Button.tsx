import type { JSX } from "react";
import style from "./Button.module.css";

type EventCard_buttonProps = {
    buttons: "cancel" | "join" | "details";
    buttonFunction: Function
}

const chooseButton = (buttonType: EventCard_buttonProps) => {
    let buttonChossed: JSX.Element = <></>;
    
    switch (buttonType.buttons) {
        case 'join':
            buttonChossed = (
                <input
                    type="button"
                    value="Participar"
                    onClick={() => buttonType.buttonFunction()}
                    className={`
                    ${style.detailsAndJoinButton} 
                `}
                />
            )
            break;

        case "cancel":
            buttonChossed = (
                <input
                    type="button"
                    value="Cancelar"
                    onClick={() => buttonType.buttonFunction()}
                    className={`
                    ${style.cancelButton}
                `}
                />
            )
            break;

        case "details":
            buttonChossed = (
                <input
                    type="button"
                    value="Detalhes"
                    onClick={() => buttonType.buttonFunction()}
                    className={`
                    ${style.detailsAndJoinButton}
                `}
                />
            )
            break;
    }

    return buttonChossed;
}

const EventCard_buttons = (props: EventCard_buttonProps) => {
    return chooseButton(props)
}

export default EventCard_buttons;
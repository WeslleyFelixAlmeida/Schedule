import type { JSX } from "react";
import style from "./Button.module.css";
import { IoExitOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { FiSave } from "react-icons/fi";

type EventCard_buttonProps = {
    buttons: "cancel" | "join" | "details" | "profile" | "logout" | "schedules";
    buttonFunction: Function
}

const chooseButton = (buttonType: EventCard_buttonProps) => {
    let buttonChossed: JSX.Element = <></>;

    switch (buttonType.buttons) {
        case "schedules":
            buttonChossed = (
                <button
                    onClick={() => buttonType.buttonFunction()}
                    className={`${style.commomButton} ${style.schedulesButton}`}
                >
                    <FiSave />
                    <p>Meus Agendamentos</p>
                </button>
            )
            break;
        case "logout":
            buttonChossed = (
                <button
                    onClick={() => buttonType.buttonFunction()}
                    className={`${style.commomButton} ${style.logoutButton}`}
                >
                    <IoExitOutline />
                    Sair
                </button>
            )
            break;
        case "profile":
            buttonChossed = (
                <button
                    onClick={() => buttonType.buttonFunction()}
                    className={`${style.commomButton} ${style.profileButton}`}
                >
                    <VscAccount />
                    Perfil
                </button>
            )
            break;
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
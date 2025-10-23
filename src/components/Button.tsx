import type { JSX } from "react";
import style from "./Button.module.css";
import { IoExitOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { FiSave } from "react-icons/fi";
import { IoCreateOutline } from "react-icons/io5";
import { RiCalendarEventFill } from "react-icons/ri";

type EventCard_buttonProps = {
    buttons: "cancel" | "join" | "details" |
    "profile" | "logout" | "schedules" | "createSchedule" | "userCreatedSchedules"
    buttonFunction: Function
}

const chooseButton = (buttonType: EventCard_buttonProps) => {
    let buttonChossed: JSX.Element = <></>;

    switch (buttonType.buttons) {
        case "userCreatedSchedules":
            buttonChossed = (
                <button
                    onClick={() => buttonType.buttonFunction()}
                    className={`${style.commomButton} ${style.createSchedulesButton}`}
                >
                    <RiCalendarEventFill />
                    <p>Eventos criados</p>
                </button>
            )
            break;
        case "createSchedule":
            buttonChossed = (
                <button
                    onClick={() => buttonType.buttonFunction()}
                    className={`${style.commomButton} ${style.createSchedulesButton}`}
                >
                    <IoCreateOutline />
                    <p>Criar evento</p>
                </button>
            )
            break;
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
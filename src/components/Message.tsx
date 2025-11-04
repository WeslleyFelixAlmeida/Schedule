import style from "./Message.module.css";

type MessageType = "error" | "success" | "alert";

type MessageProps = {
    message: string;
    type: MessageType;
    display: {display: "none"} | {display: "flex"};
    setDisplay?: Function;
}

const chooseStyle = (type: MessageType) => {
    switch (type) {
        case "alert":
            return style.alertMessage;
        case "error":
            return style.errorMessage;
        case "success":
            return style.successMessage;
        default:
            return style.defaultMessage;
    }
}

const Message = (props: MessageProps) => {
    return (
        <div className={`${style.containerMessage} ${chooseStyle(props.type)}`} style={props.display}>
            {props.message}
        </div>
    )
}

export default Message;

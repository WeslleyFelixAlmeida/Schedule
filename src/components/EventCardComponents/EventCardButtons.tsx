import type { ReactNode } from "react";
import style from "./../EventCard.module.css";

type EventCardButtonsProps = {
    children: ReactNode;
}

const EventCardButtons = ({ children }: EventCardButtonsProps) => {
    return (
        <div className={style.containerButtons}>
            {children}
        </div>
    )
}

export default EventCardButtons;
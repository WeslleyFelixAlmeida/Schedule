import type { ReactNode } from "react"
import style from "./../EventCard.module.css";

type EventCardRootProps = {
    children: ReactNode;
}

const EventCardRoot = ({ children }: EventCardRootProps) => {
    return (
        <div className={style.containerCardSchedule}>
            {children}
        </div>
    )
}

export default EventCardRoot;
import style from "./../EventCard.module.css";

import type { ReactNode } from "react";

type EventCardTopProps = {
    children: ReactNode;
}
const EventCardTop = ({children}: EventCardTopProps)=>{
    return(
        <div className={style.infoCardSchedule}>
            {children}
        </div>
    )
}

export default EventCardTop;
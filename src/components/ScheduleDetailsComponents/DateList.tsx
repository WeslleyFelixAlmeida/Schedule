import style from "./DateList.module.css";
import { useEffect, useRef, useState } from "react";

import { currentDate, currentDay, daysMonthAmount, differenceMounthXCurrentDay } from "./Date";

type DateList_props = {
    choosedDay: number;
    setChoosedDay: Function;
}

const DateList = (props: DateList_props) => {
    const [rollingDateCards, setRollingDateCards] = useState<number>(1950);
    const maxRollingRight = 130 * differenceMounthXCurrentDay;
    const controlVarRollingRight = useRef(0);

    const changeDayIncrease = () => {
        if (controlVarRollingRight.current !== maxRollingRight) {
            let value = rollingDateCards - 130
            setRollingDateCards(value);

            controlVarRollingRight.current += 130
            props.setChoosedDay(props.choosedDay + 1)
        }
    }

    const changeDayDecrease = () => {
        if (rollingDateCards !== 1950) {
            let value = rollingDateCards + 130
            setRollingDateCards(value);

            controlVarRollingRight.current -= 130
            props.setChoosedDay(props.choosedDay - 1)
        }
    }

    return (
        <div>
            <input type="button" id="buttonChangeDateLeft" className={`${style.buttonChangeDateLeft} ${style.buttonChangeDay}`} onClick={changeDayDecrease} />
            <div className={`${style.coverLeft} ${style.coverContainers}`}></div>

            <ul id="containerDate" className={style.dateList} style={{ transform: `translate(${rollingDateCards}px, 0)` }}>
                {Array.from(
                    { length: differenceMounthXCurrentDay + 1 },
                    (_, i) => {
                        const dayNumber = currentDay + i;
                        return (
                            <li key={dayNumber}>
                                <div></div>
                                <p>{dayNumber}</p>
                            </li>
                        );
                    }
                )}
            </ul>

            <div className={`${style.coverRight} ${style.coverContainers}`}></div>
            <input type="button" id="buttonChangeDateRight" className={`${style.buttonChangeDateRight} ${style.buttonChangeDay}`} onClick={changeDayIncrease} />
        </div>
    )
}
export default DateList;
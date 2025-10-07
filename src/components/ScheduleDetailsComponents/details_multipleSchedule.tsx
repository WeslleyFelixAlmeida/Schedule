import { useEffect, useRef, useState } from "react";
import style from "./Details_MultipleSchedule.module.css";

import { scheduleLine_open_element, scheduleLine_occupied_element, scheduleLine_choosed_element, participateEvent, getOutEvent } from "./Details_MultipleScheduleCards";
import DateList from "./DateList";
import { currentDay, currentMonth, getMonthName } from "./Date";

import data from "./dados.json"; // Apagar depois, serve apenas para puxar dados ficticios.

type Details_MultipleScheduleProps = {
    scheduleId: number;
}

type eventDataSchedules_props = {
    id: number;
    eventID: number;
    eventStatusId: number;
    eventHour: string
    eventDate?: string //Da para considerar os horários pela data exemplo 10/01/2025, apenas os horários deste dia serão apresentados
}

const showCards = (eventsData: eventDataSchedules_props[]) => {
    /*
    Status possíveis:
    1 -> Livre
    2 -> Ocupado
    3 -> Participando
    */
    let lines: any = []
    if(!eventsData[0]){
        return(
            <li key={0} className={style.emptyCard}>Não há horários disponíveis neste dia.</li>
        )
    }

    eventsData.map((event, index) => {
        switch (event.eventStatusId) {
            case 1:
                lines.push(
                    scheduleLine_open_element(
                        {
                            buttonFunction: () => { participateEvent(event.id) },
                            hour: event.eventHour,
                            keyID: index
                        }
                    )
                );
                break;
            case 2:
                lines.push(
                    scheduleLine_occupied_element(
                        {
                            hour: event.eventHour,
                            keyID: index
                        }
                    )
                );
                break;
            case 3:
                lines.push(
                    scheduleLine_choosed_element(
                        {
                            buttonFunction: () => { getOutEvent(event.id) },
                            hour: event.eventHour,
                            keyID: index
                        }
                    )
                );
                break;
        }
    })

    return lines;
}

const getDayData = async (day: number) => {
    //Isso vai ser ter um fetch, porém por enquanto vai ser apenas um filter do JSON para teste
    let dayData = data.filter(data =>
        data.eventDate === `2025-${String(currentMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    )
    return dayData;
}

const Details_MultipleSchedule = (props: Details_MultipleScheduleProps) => {    
    const [choosedDay, setChoosedDay] = useState<number>(currentDay);

    const [eventsData, setEventsData] = useState<eventDataSchedules_props[]>([]);

    useEffect(() => {//Aqui é onde os dados vão ser puxados da API e colocados no eventsData
        const changeDateData = async () => {
            const result = await getDayData(choosedDay);
            setEventsData(result);
            console.log("teste")
        };
        changeDateData();
    }, [choosedDay])

    return (
        <div className={style.containerMultipleSchedule}>
            <div className={style.containerList}>
                <div className={style.topContainerList}>
                    <p>x</p> {/*Isso será um botão para fazer este container desaparecer*/}
                    <h2>Datas disponíveis - {getMonthName(currentMonth - 1)}:</h2>
                </div>
                <div className={style.containerDate}>
                    <DateList choosedDay={choosedDay} setChoosedDay={setChoosedDay} />
                </div>
                <h2>Horários disponíveis:</h2>
                <ul>
                    {showCards(eventsData)}
                </ul>
            </div>
        </div>
    )
}
export default Details_MultipleSchedule;
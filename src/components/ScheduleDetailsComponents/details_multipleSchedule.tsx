import style from "./Details_MultipleSchedule.module.css";

import { scheduleLine_open_element, scheduleLine_occupied_element, scheduleLine_choosed_element, participateEvent, getOutEvent } from "./Details_MultipleScheduleCards";

import data from "./dados.json"; // Apagar depois, serve apenas para puxar dados ficticios.

type Details_MultipleScheduleProps = {
    scheduleId: number;
}

type eventDataSchedules_props = {
    eventID: number;
    eventStatusId: number;
    eventHour: string
}

const mostrarCards = (eventsData: eventDataSchedules_props[]) => {
    /*
    Status possíveis:
    1 -> Livre
    2 -> Ocupado
    3 -> Participando
    */
    let lines: any = []

    eventsData.map((event, index) => {
        switch (event.eventStatusId) {
            case 1:
                lines.push(
                    scheduleLine_open_element(
                        {
                            buttonFunction: () => { participateEvent() },
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
                            buttonFunction: () => { getOutEvent() },
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
const Details_MultipleSchedule = (props: Details_MultipleScheduleProps) => {
    let eventsData: eventDataSchedules_props[] = data; // Váriavel que vai puxar os dados da API

    return (
        <div className={style.containerMultipleSchedule}>
            <div className={style.containerList}>
                <div className={style.topContainerList}>
                    <p>x</p>
                    <h2>Datas disponíveis - Outubro:</h2>
                </div>
                <div className={style.containerDate}>
                    <ul>
                        {Array.from({ length: 25 }, (_, i) => (//Apagar depois
                            <li key={i}>
                                <div></div>
                                <p>{i + 1}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <h2>Horários disponíveis:</h2>
                <ul>
                    {mostrarCards(eventsData)}
                </ul>
            </div>
        </div>
    )
}
export default Details_MultipleSchedule;
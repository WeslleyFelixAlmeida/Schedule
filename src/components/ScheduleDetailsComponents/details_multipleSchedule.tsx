import style from "./Details_MultipleSchedule.module.css";
import ScheduleLine_choosed from "./MultipleSchedule_lines/ScheduleLine_choosed";
import ScheduleLine_occupied from "./MultipleSchedule_lines/ScheduleLine_occupied";
import ScheduleLine_open from "./MultipleSchedule_lines/ScheduleLine_open";

import data from "./dados.json"; // Apagar depois, serve apenas para puxar dados ficticios.

type Details_MultipleScheduleProps = {
    scheduleId: number;
}

type scheduleLine_props = {
    hour: string;
    buttonFunction: Function;
    keyID: number;
}

const scheduleLine_open_element = (props: scheduleLine_props) => {
    return <ScheduleLine_open hour={props.hour} buttonFunction={props.buttonFunction} key={props.keyID} />
}

const scheduleLine_occupied_element = (props: Pick<scheduleLine_props, "hour" | "keyID">) => {
    return <ScheduleLine_occupied hour={props.hour} key={props.keyID} />
}

const scheduleLine_choosed_element = (props: scheduleLine_props) => {
    return <ScheduleLine_choosed hour={props.hour} buttonFunction={props.buttonFunction} key={props.keyID} />
}


const mostrarCards = () => {
    let lines: any = []
    lines.push(
        scheduleLine_open_element(
            {
                buttonFunction: () => { console.log("Testando!") },
                hour: "10:15",
                keyID: 1
            }
        )
    );

    lines.push(

        scheduleLine_occupied_element(
            {
                hour: "10:30",
                keyID: 2
            }
        )
    );

    lines.push(
        scheduleLine_choosed_element(
            {
                buttonFunction: () => { console.log("Testando!") },
                hour: "10:45",
                keyID: 3
            }
        )
    );

    return lines;
}

const Details_MultipleSchedule = (props: Details_MultipleScheduleProps) => {

    const teste = () => {
        console.log("Teste")
    }

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
                    {/* <ScheduleLine_open hour={"10:00"} buttonFunction={teste} key={1} />
                    <ScheduleLine_occupied hour={"10:30"} key={2} />
                    <ScheduleLine_choosed hour={"12:45"} buttonFunction={teste} key={3} /> */}
                    {mostrarCards()}
                </ul>
            </div>
        </div>
    )
}
export default Details_MultipleSchedule;
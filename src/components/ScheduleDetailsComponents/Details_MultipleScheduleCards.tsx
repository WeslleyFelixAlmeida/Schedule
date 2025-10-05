import ScheduleLine_choosed from "./MultipleSchedule_lines/ScheduleLine_choosed";
import ScheduleLine_occupied from "./MultipleSchedule_lines/ScheduleLine_occupied";
import ScheduleLine_open from "./MultipleSchedule_lines/ScheduleLine_open";


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

//Nestas duas funções vão estar as requests para deixar/participar do evento:
const participateEvent = () => {
    console.log("Entrou no evento!");
}

const getOutEvent = () => {
    console.log("Saiu do evento!");
}


export { scheduleLine_open_element, scheduleLine_occupied_element, scheduleLine_choosed_element, participateEvent, getOutEvent };
import style from "./Details_MultipleSchedule.module.css";
import ScheduleLine_choosed from "./MultipleSchedule_lines/ScheduleLine_choosed";
import ScheduleLine_occupied from "./MultipleSchedule_lines/ScheduleLine_occupied";
import ScheduleLine_open from "./MultipleSchedule_lines/ScheduleLine_open";

type Details_MultipleScheduleProps = {
    scheduleId: number;
}

const Details_MultipleSchedule = (props: Details_MultipleScheduleProps)=> {

    const teste = ()=>{
        console.log("Teste")
    }

    return (
        <div className={style.containerMultipleSchedule}>
            <div className={style.containerList}>
                <div className={style.topContainerList}>
                    <p>x</p>
                    <h2>Datas disponíveis:</h2>
                </div>
                <div className={style.containerDate}>
                    <ul>
                        {Array.from({ length: 25 }, (_, i) => (//Apagar depois
                            <li key={i}>Datas</li>
                        ))}
                    </ul>
                </div>
                <h2>Horários disponíveis:</h2>
                <ul>
                    <ScheduleLine_open hour={"10:00"} buttonFunction={teste} key={1}/>
                    <ScheduleLine_occupied hour={"10:30"} key={2}/>
                    <ScheduleLine_choosed hour={"12:45"} buttonFunction={teste} key={3}/>
                </ul>
            </div>
        </div>
    )
}
export default Details_MultipleSchedule;
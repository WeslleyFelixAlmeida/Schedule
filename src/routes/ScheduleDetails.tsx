import { Link, useSearchParams } from "react-router-dom";
import EventCard_buttons from "../components/EventCardComponents/EventCard_buttons";
import schedule_img from "./../assets/imgs/img_teste.jpg";
import style from "./ScheduleDetails.module.css";

const ScheduleDetails = () => {
    const [params] = useSearchParams();
    const scheduleId = Number(params.get("id"));
    const eventType = ["uniqueSchedule", "multipleSchedule"] //Isso vai vir do banco de dados com as informações do agendamento

    const scheduleData = {
        title: "Cabeleireiro",
        shortDescription: "Cabeleireiro - Cortes.LTDA, agende um horário",
        currentStatus: "open",
        maxAmount: 12,
        currentAmount: 10,
        buttonsType: "join",
        scheduleId: 1,
        eventType: "uniqueSchedule",
        description: "Cabeleireiro especializado em cuidados com os cabelos, oferecendo serviços de corte, coloração, hidratação, escova e penteados para diferentes ocasiões. Com atenção aos detalhes e foco na satisfação do cliente, busca realçar a beleza natural e proporcionar bem-estar em cada atendimento. Atua com técnicas atualizadas, produtos de qualidade e atendimento personalizado para todos os estilos e necessidades."
    }

    return (
        <div className={style.containerMain}>
            <Link to={"/schedules"}>Voltar</Link>
            <div className={style.detailsTitleContainer}>
                <h1>{scheduleData.title}</h1>
                <h2>{scheduleData.shortDescription}</h2>
            </div>
            <div className={style.centerDetailsContainer}>
                <div className={style.imageContainer}>
                    <div className={style.mainImageContainer}>
                        <img src={schedule_img} alt="imagem evento" />
                    </div>
                </div>
                <div className={style.descriptionContainer}>
                    <h2>Descrição:</h2>
                    <p>{scheduleData.description}</p>
                </div>
            </div>
            <div className={style.containerDetailsButtons}>
                <input type="button" value="Participar" className={`${style.detailsButtons} ${style.joinButton}`}/>
                {/* <input type="button" value="Cancelar" className={`${style.detailsButtons} ${style.cancelButton}`}/> */}
            </div>

        </div>
    )
}

export default ScheduleDetails;
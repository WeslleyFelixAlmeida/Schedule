import { useSearchParams } from "react-router-dom";

const ScheduleDetails = () => {
    const [params] = useSearchParams();
    const scheduleId = params.get("id")
    const eventType = ["uniqueSchedule", "multipleSchedule"] //Isso vai vir do banco de dados com as informações do agendamento

    return (
        <>
            evento:{scheduleId}
        </>
    )
}

export default ScheduleDetails;
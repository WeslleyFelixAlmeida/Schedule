import style from "./EventCard.module.css";
import Event_image from "./Event_image";


const statusStyle = [{
    color: "green",
    backgroundColor: "green",
    borderColor: "green"
},
{
    color: "green",

}];


const stylesAmount = [
    {
        color: "var(--golden_fonts)",
        backgroundColor: "var(--golden_fonts)"
    },
    {
        color: "var(--golden_fonts)",
    }
]

const EventCard = () => {
    return (
        <div className={style.containerMain}>
            <div className={style.containerCardSchedule}>
                <div className={style.elementsCardSchedule}>
                    <div className={style.infoCardSchedule}>
                        <div className={style.containerText}>
                            <h1>Cabeleireiro</h1>
                            <p>Cabeleireiro - Cortes.LTDA, agende um horário</p>
                        </div>
                        <div className={style.containerStatusAndAmount}>
                            <div className={style.containerStatus}>
                                <div className={style.StatusAndAmountCircle} style={statusStyle[0]}></div>
                                <p style={statusStyle[1]}>Com vagas</p>
                            </div>
                            <div className={style.containerAmount}>
                                <div className={style.StatusAndAmountCircle} style={stylesAmount[0]}></div>
                                <p style={stylesAmount[1]}><span>10/12</span> Pessoas</p>
                            </div>
                        </div>
                    </div>
                    <Event_image width="150px" />
                </div>
                <div className={style.containerButtonsCard}>
                    <input type="button" value="Participar" />
                    {/* <input type="button" value="Cancelar" /> */}
                    <input type="button" value="Detalhes" />
                </div>
            </div>
        </div>
    )
}

export default EventCard;
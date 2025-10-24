import { useState } from "react";
import style from "./CreateUniqueSchedule.module.css";
import imagem from "../../assets/imgs/img_teste.jpg"; // Apagar depois!
import { MdUploadFile } from "react-icons/md";

type CreateUniqueSchedule_props = {

}
//FAZER VALIDAÇÕES COM ZOD!!!!
const CreateUniqueSchedule = (props: CreateUniqueSchedule_props) => {
    const [eventImage, setEventImage] = useState();

    return (
        <div className={style.containerCreateUniqueSchedule}>
            <h2>Evento de escala única:</h2>
            <form className={style.formCreateEvent} id="formCreateEvent">
                <div className={`${style.containerFormImage}`}>
                    <p>Imagem do evento:</p>
                    <label htmlFor="eventImage">
                        <MdUploadFile />
                        Clique aqui para adicionar
                    </label>
                    <input type="file" name="eventImage" id="eventImage" accept="image/*" />
                    <img src={imagem} alt="Imagem do evento" />
                </div>

                <div className={`${style.containerFormName} ${style.containerEventFormUnique}`}>
                    <p>Nome:</p>
                    <input type="text" name="eventName" id="eventName" placeholder="Nome do evento" />
                </div>

                <div className={`${style.containerFormShortDesc} ${style.containerEventFormUnique}`}>
                    <p>Descrição curta:</p>
                    <input type="text" name="eventShortDesc" id="eventShortDesc" placeholder="Descrição curta" />
                </div>

                <div className={`${style.containerFormLongDesc} ${style.containerEventFormUnique}`}>
                    <p>Descrição longa:</p>
                    <textarea name="eventLongDesc" id="eventLongDesc" placeholder="Descrição longa"></textarea>
                </div>

                <div className={`${style.containerFormMaxAmount} ${style.containerEventFormUnique}`}>
                    <p>Quantidade máxima:</p>
                    <input type="number" name="maxAmount" id="maxAmount" placeholder="Quantidade máxima de pessoas" />
                </div>

                <div className={`${style.containerFormDate} ${style.containerEventFormUnique}`}>
                    <p>Data do evento:</p>
                    <input type="date" name="eventDate" id="eventDate" />
                </div>
                <input type="submit" value="Criar evento" />
            </form>
        </div>
    )
}

export default CreateUniqueSchedule;
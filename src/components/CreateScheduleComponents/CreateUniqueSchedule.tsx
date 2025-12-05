import { useState } from "react";
import style from "./CreateUniqueSchedule.module.css";
import { MdUploadFile } from "react-icons/md";
import { currentDate } from "../ScheduleDetailsComponents/Date";

type CreateUniqueSchedule_props = {

}

const convertImageToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result as string);

        reader.onerror = () =>
            reject(new Error("Falha ao ler o arquivo"));

        reader.readAsDataURL(file);
    });
};


const CreateUniqueSchedule = (props: CreateUniqueSchedule_props) => {
    const [eventImage, setEventImage] = useState<string>("");

    const handleChangeImage = async (e: any) => {
        const file = e.target.files?.[0];

        if (!file) {
            return
        };

        try {
            const base64 = await convertImageToBase64(file);
            setEventImage(base64);
        } catch (err) {
            console.error("Erro ao converter imagem:", err);
        }
    };

    const createEvent = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const eventImage = formData.get("eventImage") as File;

        let base64Image = null;

        try {
            if (eventImage && eventImage.size > 0) {
                base64Image = await convertImageToBase64(eventImage);
            }
        } catch (err) {
            return;
        }
    }

    return (
        <div className={style.containerCreateUniqueSchedule}>
            <h2>Evento de escala única:</h2>
            <form className={style.formCreateEvent} id="formCreateEvent" onSubmit={createEvent}>
                <div className={`${style.containerFormImage}`}>
                    <p>Imagem do evento:</p>
                    <label htmlFor="eventImage">
                        <MdUploadFile />
                        Clique aqui para adicionar
                    </label>
                    <input
                        type="file"
                        name="eventImage"
                        id="eventImage"
                        accept="image/*"
                        onChange={handleChangeImage}
                        required
                    />
                    {eventImage &&
                        <img src={eventImage} alt="Imagem do evento" />
                    }
                </div>

                <div className={`${style.containerFormName} ${style.containerEventFormUnique}`}>
                    <p>Nome:</p>
                    <input type="text" name="eventName" id="eventName" placeholder="Nome do evento" required />
                </div>

                <div className={`${style.containerFormShortDesc} ${style.containerEventFormUnique}`}>
                    <p>Descrição curta:</p>
                    <input type="text" name="eventShortDesc" id="eventShortDesc" placeholder="Descrição curta" required />
                </div>

                <div className={`${style.containerFormLongDesc} ${style.containerEventFormUnique}`}>
                    <p>Descrição longa:</p>
                    <textarea name="eventLongDesc" id="eventLongDesc" placeholder="Descrição longa" required></textarea>
                </div>

                <div className={`${style.containerFormMaxAmount} ${style.containerEventFormUnique}`}>
                    <p>Quantidade máxima:</p>
                    <input type="number" name="maxAmount" id="maxAmount" placeholder="Quantidade máxima de pessoas" required />
                </div>

                <div className={`${style.containerFormDate} ${style.containerEventFormUnique}`}>
                    <p>Data do evento:</p>
                    <input type="date" name="eventDate" id="eventDate" required max="9999-12-31"
                        min={currentDate}
                    />
                </div>
                <input type="submit" value="Criar evento" />
            </form>
        </div>
    )
}

export default CreateUniqueSchedule;
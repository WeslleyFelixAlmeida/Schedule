import style from "./CreateUniqueSchedule.module.css";
import { useState, type ChangeEvent } from "react";
import { MdUploadFile } from "react-icons/md";
import { currentDate } from "../ScheduleDetailsComponents/Date";
import { z, ZodError } from "zod"
import { timeOut } from "../../Utils/UtilsFunctions";
import { convertImageToBase64 } from "../../Utils/UtilsFunctions";
import { API_URL } from "../../config";

type CreateUniqueSchedule_props = {

}

const uniqueScheduleSchema = z.object({
    eventName: z.string().min(5).max(60),
    eventShortDesc: z.string().min(1).max(55),
    eventLongDesc: z.string().min(1).max(400),
    maxAmount: z.coerce.number().min(1),
    date: z.string().regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Data inválida. Use o formato YYYY-MM-DD"
    ),
    eventImage: z.string().regex(
        /^data:image\/(png|jpe?g|gif|webp);base64,[A-Za-z0-9+/=]+$/,
        "Imagem inválida"
    ),
    hour: z.string().regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Horário inválido. Use o formato HH:mm"
    ),
});

const CreateUniqueSchedule = (props: CreateUniqueSchedule_props) => {
    const [eventImage, setEventImage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [scheduleHourBegin, setScheduleHourBegin] = useState<string>("00:00");

    const errorMessages = [
        "Ocorreu um erro ao tentar criar o evento.",
        "Há campos vazios ou com informações inválidas, verifique os campos e tente novamente."
    ]

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

    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setScheduleHourBegin(e.target.value);
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

        const formObj = {
            eventName: formData.get("eventName"),
            eventShortDesc: formData.get("eventShortDesc"),
            eventLongDesc: formData.get("eventLongDesc"),
            maxAmount: formData.get("maxAmount"),
            date: formData.get("eventDate") as string,
            hour: formData.get("scheduleHourBegin"),
            eventImage: base64Image,
        };

        try {
            const validate = uniqueScheduleSchema.parse(formObj);
            console.log(validate);
            //Fazer a request da API aqui:
            fetch(`${API_URL}/event/create/unique`, {
                method: "POST",
                body: JSON.stringify(validate),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
                .then((data) => data.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => console.log(err));

        } catch (err: any) {
            if (err instanceof ZodError) {
                setErrorMessage(errorMessages[1]);
                timeOut(() => setErrorMessage(""), 3000);
                return null;
            }
            setErrorMessage(errorMessages[0]);
            timeOut(() => setErrorMessage(""), 3000);
        }
    }

    return (
        <div className={style.containerCreateUniqueSchedule}>
            <h2>Evento de escala única:</h2>
            <p>* Obrigatórias</p>
            <form className={style.formCreateEvent} id="formCreateEvent" onSubmit={createEvent}>
                <div className={`${style.containerFormImage}`}>
                    <p><span style={{ color: "red" }}>* </span>Imagem do evento:</p>
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
                    <p><span style={{ color: "red" }}>* </span>Nome:</p>
                    <input type="text" name="eventName" id="eventName" placeholder="Nome do evento" required className={style.formInputs} />
                </div>

                <div className={`${style.containerFormShortDesc} ${style.containerEventFormUnique}`}>
                    <p><span style={{ color: "red" }}>* </span> Descrição curta:</p>
                    <input type="text" name="eventShortDesc" id="eventShortDesc" placeholder="Descrição curta" required className={style.formInputs} />
                </div>

                <div className={`${style.containerFormLongDesc} ${style.containerEventFormUnique}`}>
                    <p><span style={{ color: "red" }}>* </span>Descrição longa:</p>
                    <textarea name="eventLongDesc" id="eventLongDesc" placeholder="Descrição longa" required className={style.formInputs}></textarea>
                </div>

                <div className={`${style.containerFormMaxAmount} ${style.containerEventFormUnique}`}>
                    <p><span style={{ color: "red" }}>* </span>Quantidade máxima:</p>
                    <input type="number" name="maxAmount" id="maxAmount" placeholder="Quantidade máxima de pessoas" required className={style.formInputs} />
                </div>

                <div className={`${style.containerFormDate} ${style.containerEventFormUnique}`}>
                    <p><span style={{ color: "red" }}>* </span> Data do evento:</p>
                    <input type="date" name="eventDate" id="eventDate" required max="9999-12-31"
                        min={currentDate}
                        className={style.formInputs} />
                </div>
                <div className={`${style.containerFormDate} ${style.containerEventFormUnique}`}>
                    <p><span style={{ color: "red" }}>* </span> Horário do evento:</p>
                    <input type="time" name="scheduleHourBegin" id="scheduleHourBegin" onChange={handleTimeChange} value={scheduleHourBegin} className={style.formInputs} />
                </div>

                <input type="submit" value="Criar evento" />
            </form>
            {errorMessage &&
                <p className={style.alertMessage}>
                    {/* Ocorreu um erro ao tentar criar o evento, verifique os campos e tente novamente. */}
                    {errorMessage}</p>
            }
        </div>
    )
}

export default CreateUniqueSchedule;
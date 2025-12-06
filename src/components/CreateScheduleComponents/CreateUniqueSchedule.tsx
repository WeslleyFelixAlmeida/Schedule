import { useEffect, useState } from "react";
import style from "./CreateUniqueSchedule.module.css";
import { MdUploadFile } from "react-icons/md";
import { currentDate } from "../ScheduleDetailsComponents/Date";
import { z, ZodError } from "zod"
import { timeOut } from "../../Utils/UtilsFunctions";

type CreateUniqueSchedule_props = {

}

const uniqueScheduleSchema = z.object({
    name: z.string().min(5).max(60),
    shortDescription: z.string().min(1).max(55),
    longDescription: z.string().min(1).max(400),
    maxAmount: z.coerce.number().min(1),
    date: z.coerce.date(),
    image: z.string().regex(
        /^data:image\/(png|jpe?g|gif|webp);base64,[A-Za-z0-9+/=]+$/,
        "Imagem inválida"
    )
});


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
    const [errorMessage, setErrorMessage] = useState<string>("");
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
            name: formData.get("eventName"),
            shortDescription: formData.get("eventShortDesc"),
            longDescription: formData.get("eventLongDesc"),
            maxAmount: formData.get("maxAmount"),
            date: formData.get("eventDate"),
            image: base64Image,
        };

        try {
            const validate = uniqueScheduleSchema.parse(formObj);
            console.log(validate);
        } catch (err: any) {
            if (err instanceof ZodError) {
                setErrorMessage(errorMessages[1]);
                return null;
            }
            setErrorMessage(errorMessages[0]);
        }
    }

    useEffect(() => {
        timeOut(() => setErrorMessage(""), 3000);
    }, [errorMessage])

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
                    <input type="text" name="eventName" id="eventName" placeholder="Nome do evento" required />
                </div>

                <div className={`${style.containerFormShortDesc} ${style.containerEventFormUnique}`}>
                    <p><span style={{ color: "red" }}>* </span> Descrição curta:</p>
                    <input type="text" name="eventShortDesc" id="eventShortDesc" placeholder="Descrição curta" required />
                </div>

                <div className={`${style.containerFormLongDesc} ${style.containerEventFormUnique}`}>
                    <p><span style={{ color: "red" }}>* </span>Descrição longa:</p>
                    <textarea name="eventLongDesc" id="eventLongDesc" placeholder="Descrição longa" required></textarea>
                </div>

                <div className={`${style.containerFormMaxAmount} ${style.containerEventFormUnique}`}>
                    <p><span style={{ color: "red" }}>* </span>Quantidade máxima:</p>
                    <input type="number" name="maxAmount" id="maxAmount" placeholder="Quantidade máxima de pessoas" required />
                </div>

                <div className={`${style.containerFormDate} ${style.containerEventFormUnique}`}>
                    <p><span style={{ color: "red" }}>* </span> Data do evento:</p>
                    <input type="date" name="eventDate" id="eventDate" required max="9999-12-31"
                        min={currentDate}
                    />
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
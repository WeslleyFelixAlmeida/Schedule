const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
const isValidTime = (time: string) => timeRegex.test(time);


const disableScroll = () => document.body.style.overflow = "hidden";
const enableScroll = () => document.body.style.overflow = "auto";


const timeOut = (func: Function, time: number) => {
    const timeout = setTimeout(() => func(), time);

    return () => clearTimeout(timeout);
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

export { isValidTime, disableScroll, enableScroll, timeOut, convertImageToBase64 };
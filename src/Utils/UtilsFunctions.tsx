const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
const isValidTime = (time: string) => timeRegex.test(time);


const disableScroll = () => document.body.style.overflow = "hidden";
const enableScroll = () => document.body.style.overflow = "auto";


const timeOut = (func: Function, time: number) => {
    const timeout = setTimeout(() => func(), time);

    return () => clearTimeout(timeout);
}

export { isValidTime, disableScroll, enableScroll, timeOut };
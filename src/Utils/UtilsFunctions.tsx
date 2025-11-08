const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
const isValidTime = (time: string) => timeRegex.test(time);

export { isValidTime };

const disableScroll = () => document.body.style.overflow = "hidden";
const enableScroll = () => document.body.style.overflow = "auto";

export { disableScroll, enableScroll };
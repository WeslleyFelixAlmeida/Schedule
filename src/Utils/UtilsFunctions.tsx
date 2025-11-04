const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
const isValidTime = (time: string) => timeRegex.test(time);

export { isValidTime };
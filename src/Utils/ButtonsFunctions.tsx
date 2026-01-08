const joinEvent = (eventId: number) => {
    return console.log("Entrou no evento de id: " + eventId);
}
const exitEvent = (eventId: number) => {
    return console.log("Saiu do evento de id: " + eventId);
}

export { joinEvent, exitEvent };
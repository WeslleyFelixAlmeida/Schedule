import { API_URL } from "../config";

type joinType = {
    isFull: boolean;
    success: boolean;
}

const joinEvent = async (eventId: number, eventType: "UNIQUE" | "MULTIPLE"): Promise<joinType> => {
    if (eventType === "UNIQUE") {
        const request = await fetch(`${API_URL}/event/join/unique/${eventId}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!request.ok) {
            return { isFull: false, success: false };
        }

        const data = await request.json();
        if (!data.noSpot) {
            return { isFull: false, success: true };
        }

    }

    return { isFull: false, success: false };
}


const exitEvent = async (eventId: number) => {
    return console.log("Saiu do evento de id: " + eventId);
}

export { joinEvent, exitEvent };
export type EventDataProps = {
    scheduleId: number
    title: string;
    shortDescription: string;
    description: string;
    maxAmount: number;
    currentAmount: number;
    currentStatus: "closed" | "open";
    eventType: "multipleSchedule" | "uniqueSchedule"; //
    isParticipating: "yes" | "no" | "multipleScheduleSituation"; //
    // buttonsType: "cancel" | "join" | "details"; //
}

export type PerfilOptionsProps = {
    transition: "height 0.5s ease" | "none";
    backgroundColor: "white" | "transparent";
    height: "300px" | "80px";
}
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
type uniqueScheduleProps = {
    eventType: "uniqueSchedule";
    maxAmount: number;
    currentAmount: number;
    isParticipating: "yes" | "no";
    eventDate: string;
}

type multipleScheduleProps = {
    eventType: "multipleSchedule";
    maxAmount: -1;
    currentAmount: -1;
    isParticipating: null;
    eventDate: null;
}

//Recriar as validações com esse type:
export type EventDataProps = (uniqueScheduleProps | multipleScheduleProps) & {
    id?: number
    scheduleId: number;
    title: string;
    shortDescription: string;
    description: string;
    currentStatus: "closed" | "open";
    creatorId: string;
    creatorName: string;
    place: "remote" | {
        placeName: string,
        placeCity: string,
        // placeCountry: string,
        streetName: string,
        streetNumber: number,
        addressType: "commom" | "building" | "remote"
        room?: number, // Caso seja em prédio
    }
    isFull?: boolean;
}

// export type EventDataProps = {
//     scheduleId: number;
//     title: string;
//     shortDescription: string;
//     description: string;
//     maxAmount: number;//Apagar
//     currentAmount: number;//Apagar
//     currentStatus: "closed" | "open";
//     creatorId: string;
//     creatorName: string
//     eventDate: string; //Só vai vir da API caso o evento seja de multiplas escala
//     place: "remote" | {
//         placeName: string,
//         placeCity: string,
//         // placeCountry: string,
//         streetName: string,
//         streetNumber: number,
//         addressType: "commom" | "building" | "remote"
//         room?: number, // Caso seja em prédio
//     }
//     isFull?: boolean;
//     eventType: "multipleSchedule" | "uniqueSchedule"; //Apagar
//     isParticipating: "yes" | "no" | "multipleScheduleSituation";
//     //No caso se multipleSchedule o isParticipating vai automaticamente ser multipleScheduleSituation, e caso seja uniqueSchedule isParticipating poderá assumir yes ou no
// }

export type ProfileOptionsProps = {
    transition: "height 0.5s ease" | "none";
    backgroundColor: "white" | "transparent";
    height: "390px" | "80px";
}

export type DaySchedule = {
    day: number;
    checked: boolean;
    schedules: {
        schedullingHour: string;
    }[];
};

export type multipleSchedulesProps = {
    days: DaySchedule[];
    setDays: Function;
}

export type schedulesRulers = {
    SchedulingInterval: { from: string, to: string } | null,
    SchedulingIntervalType: { time: number, type: "hour" | "minutes" } | null;
    GeneralDaysInterval: { from: string, to: string }[] | null;
    DayInterval: { day: number, from: string, to: string }[] | null;
    SpecificScheduling: { day: number, from: string, to: string }[] | null;
}

export type schedulesRulers_props = {
    schedulesRulers: schedulesRulers;
    setSchedulesRulers: Function;
}
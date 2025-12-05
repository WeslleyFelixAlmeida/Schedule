import { useRef } from "react";

const date: Date = new Date();

const currentMonth = date.getMonth() + 1;
const currentDay = date.getDate();
const currentYear = date.getFullYear();
const currentDate = `${String(currentYear).padStart(2, "0")
    }-${String(currentMonth).padStart(2, "0")
    }-${String(currentDay).padStart(2, "0")
    }`;

const daysMonthAmount = new Date(currentYear, currentMonth, 0).getDate();
const differenceMounthXCurrentDay = daysMonthAmount - currentDay;

const getMonthName = (month: number) => {
    switch (month) {
        case 0: return "Janeiro";
        case 1: return "Fevereiro";
        case 2: return "Março";
        case 3: return "Abril";
        case 4: return "Maio";
        case 5: return "Junho";
        case 6: return "Julho";
        case 7: return "Agosto";
        case 8: return "Setembro";
        case 9: return "Outubro";
        case 10: return "Novembro";
        case 11: return "Dezembro";
    }
}

export { date, currentMonth, currentDay, currentYear, daysMonthAmount, currentDate, differenceMounthXCurrentDay, getMonthName }

import perfilImage from "./../assets/imgs/ta.jpg";
import type { EventDataProps } from "./Types";

const userData = {
  id: 1,
  username: "Usuário 1",
  userEmail: "teste@gmail.com",
  userImage: perfilImage,
};

export { userData };


type propsExample = Pick<
  EventDataProps,
  | "scheduleId"
  | "title"
  | "shortDescription"
  | "eventType"
  | "isParticipating"
  | "currentStatus"
  | "maxAmount"
  | "currentAmount"
  | "description"
>;

//Evento: ABERTO, PARTICIPANDO, ESCALA ÚNICA
const eventData1: propsExample = {
  title: "Cabeleireiro",
  shortDescription: "Cabeleireiro - Cortes.LTDA, agende um horário",
  maxAmount: 11,
  currentAmount: 10,
  scheduleId: 1,
  description: "Cabeleireiro especializado em cuidados com os cabelos, oferecendo serviços de corte, coloração, hidratação, escova e penteados para diferentes ocasiões. Com atenção aos detalhes e foco na satisfação do cliente, busca realçar a beleza natural e proporcionar bem-estar em cada atendimento. Atua com técnicas atualizadas, produtos de qualidade e atendimento personalizado para todos os estilos e necessidades.",
  
  currentStatus: "open",
  eventType: "uniqueSchedule",
  isParticipating: "yes"
}

//Evento: FECHADO, PARTICIPANDO, ESCALA ÚNICA
const eventData2: propsExample = {
  title: "Cabeleireiro",
  shortDescription: "Cabeleireiro - Cortes.LTDA, agende um horário",
  maxAmount: 11,
  currentAmount: 10,
  scheduleId: 1,
  description: "Cabeleireiro especializado em cuidados com os cabelos, oferecendo serviços de corte, coloração, hidratação, escova e penteados para diferentes ocasiões. Com atenção aos detalhes e foco na satisfação do cliente, busca realçar a beleza natural e proporcionar bem-estar em cada atendimento. Atua com técnicas atualizadas, produtos de qualidade e atendimento personalizado para todos os estilos e necessidades.",
  
  currentStatus: "closed",
  eventType: "uniqueSchedule",
  isParticipating: "yes"
}

//Evento: FECHADO, NÃO PARTICIPANDO, ESCALA ÚNICA
const eventData3: propsExample = {
  title: "Cabeleireiro",
  shortDescription: "Cabeleireiro - Cortes.LTDA, agende um horário",
  maxAmount: 11,
  currentAmount: 10,
  scheduleId: 1,
  description: "Cabeleireiro especializado em cuidados com os cabelos, oferecendo serviços de corte, coloração, hidratação, escova e penteados para diferentes ocasiões. Com atenção aos detalhes e foco na satisfação do cliente, busca realçar a beleza natural e proporcionar bem-estar em cada atendimento. Atua com técnicas atualizadas, produtos de qualidade e atendimento personalizado para todos os estilos e necessidades.",

  currentStatus: "closed",
  eventType: "uniqueSchedule",
  isParticipating: "no"
}


//Evento: ABERTO, MULTIPLA ESCALA
const eventData4: propsExample = {
  title: "Cabeleireiro",
  shortDescription: "Cabeleireiro - Cortes.LTDA, agende um horário",
  currentStatus: "open",
  maxAmount: -1,
  currentAmount: -1,
  scheduleId: 1,
  eventType: "multipleSchedule",
  description: "Cabeleireiro especializado em cuidados com os cabelos, oferecendo serviços de corte, coloração, hidratação, escova e penteados para diferentes ocasiões. Com atenção aos detalhes e foco na satisfação do cliente, busca realçar a beleza natural e proporcionar bem-estar em cada atendimento. Atua com técnicas atualizadas, produtos de qualidade e atendimento personalizado para todos os estilos e necessidades.",
  isParticipating: null
}

//Evento: ABERTO, MULTIPLA ESCALA
const eventData5: propsExample = {
  title: "Cabeleireiro",
  shortDescription: "Cabeleireiro - Cortes.LTDA, agende um horário",
  currentStatus: "closed",
  maxAmount: -1,
  currentAmount: -1,
  scheduleId: 1,
  eventType: "multipleSchedule",
  description: "Cabeleireiro especializado em cuidados com os cabelos, oferecendo serviços de corte, coloração, hidratação, escova e penteados para diferentes ocasiões. Com atenção aos detalhes e foco na satisfação do cliente, busca realçar a beleza natural e proporcionar bem-estar em cada atendimento. Atua com técnicas atualizadas, produtos de qualidade e atendimento personalizado para todos os estilos e necessidades.",
  isParticipating: null
}


const eventData = eventData4;
export { eventData };
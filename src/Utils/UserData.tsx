import { API_URL } from "../config";
import type { EventDataProps } from "./Types";
import perfilImage from "./../assets/imgs/ta.jpg";

export type userType = {
  username: string;
  email: string;
  profileImage: string;
}


// type propsExample = Pick<
//   EventDataProps,
//   | "scheduleId"
//   | "title"
//   | "shortDescription"
//   | "eventType"
//   | "isParticipating"
//   | "currentStatus"
//   | "maxAmount"
//   | "currentAmount"
//   | "description"
// >;
import { Server } from "./server";

export interface CustomResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: { servers?: Server[], server?: Server}; // We won't get both of them at the same time therefor the ?'s
}
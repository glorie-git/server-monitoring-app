// Represents the entire state of the application

import { DataState } from "src/app/enum/data-state.enum";

export interface AppState<T> {
    dataState: DataState;
    appData?: T; // appData is generic, whatever is passed is used
    error?: string;
}
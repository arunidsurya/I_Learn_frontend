// customAxiosConfig.ts
import { AxiosRequestConfig } from "axios";

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  role?: string;
}

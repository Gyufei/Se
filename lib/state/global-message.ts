import { atom } from "jotai";

export type IActionType = "success" | "warning" | "error";

export const GlobalMessageAtom = atom<{
  type: IActionType;
  message: string;
} | null>(null);

"use client";

import { createStore, Provider } from "jotai";

export const JotaiStore = createStore();

export const JotaiProviders = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={JotaiStore}>{children}</Provider>;
};

"use client";
import { AppStore, makeStore } from "@/src/shared/lib";
import { useRef } from "react";
import { Provider } from "react-redux";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

"use client";

import { Provider as StoreProvider } from "react-redux";
import store from "../Store";

export function Providers({ children }) {
  return <StoreProvider store={store}>{children}</StoreProvider>;
}

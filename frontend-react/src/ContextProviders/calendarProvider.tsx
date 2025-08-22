import React, { createContext } from "react";
import { ButtonClick } from "../pages/Calendar/types";

const noop: ButtonClick = (_i, _j) => {};

export const CalendarContext = createContext({ buttonClick: noop });

interface Props {
  children: React.ReactNode;
  call: ButtonClick
}

export const CalendarProvider: React.FC<Props> = ({ children, call}) => {
  return (
    <CalendarContext.Provider value={{buttonClick: call }}>
      {children}
    </CalendarContext.Provider>
  );
};
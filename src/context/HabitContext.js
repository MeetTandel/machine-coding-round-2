import { createContext, useContext, useReducer } from "react";
import { HabitReducer } from "../reducers/HabitReducer";
import habits from "../data.json";
const HabitContext = createContext();

const initialState = {
  habits: habits ?? [],
  repeatDropDown: [
    {
      name: "Daily",
      value: "Daily",
    },
    {
      name: "Weekly",
      value: "Weekly",
    },
    {
      name: "Monthly",
      value: "Monthly",
    },
  ],
  goalsDropDown: [
    {
      name: "1 time",
      value: "1 time",
    },
    {
      name: "2 times",
      value: "2 times",
    },
    {
      name: "3 times",
      value: "3 times",
    },
  ],
  timeDropDown: [
    {
      name: "Any Time",
      value: "Any Time",
    },
    {
      name: "Morning",
      value: "Morning",
    },
    {
      name: "Afternoon",
      value: "Afternoon",
    },
    {
      name: "Evening",
      value: "Evening",
    },
  ],
  startDayDropDown: [
    {
      name: "Today",
      value: "Today",
    },
    {
      name: "Tomorrow",
      value: "Tomorrow",
    },
    {
      name: "Day After Tomorrow",
      value: "Day After Tomorrow",
    },
  ],
};

export function HabitProvider({ children }) {
  const [habitState, dispatch] = useReducer(HabitReducer, initialState);

  return (
    <HabitContext.Provider
      value={{
        habits: habitState.habits,
        repeatDropDown: habitState.repeatDropDown,
        goalsDropDown: habitState.goalsDropDown,
        timeDropDown: habitState.timeDropDown,
        startDayDropDown: habitState.startDayDropDown,
        dispatch,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}
export const useHabits = () => useContext(HabitContext);

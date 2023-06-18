export const HabitReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_HABIT":
      return {
        ...state,
        habits: [...state.habits, payload],
      };
    case "EDIT_HABIT":
      return {
        ...state,
        habits: state.habits.map((item) =>
          item.id === payload.id ? { ...item, ...payload } : item
        ),
      };
    case "ARCHIVE_HABIT":
      return {
        ...state,
        habits: state.habits.filter((item) => item.id !== payload.id),
        archivedHabits: [...state.archivedHabits, payload],
      };
    case "DELETE_HABIT":
      return {
        ...state,
        habits: state.habits.filter((item) => item.id !== payload),
      };
    default:
      return { ...state };
  }
};

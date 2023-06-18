export const HabitReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_HABIT":
      return {
        ...state, 
        habits: [...state.habits, payload]
      };
    case "EDIT_HABIT":
      return {
        ...state,
        habits: state.habits.map((item) =>
          item.id === payload.id ? { ...item, ...payload.data } : item
        ),
      };
    default:
      return { ...state };
  }
};

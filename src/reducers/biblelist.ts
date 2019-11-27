const biblelistReducerDefaultState = [];

export default (state = biblelistReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_BIBLEVERSE":
      return [...state, action.bibleverse];
    case "REMOVE_BIBLEVERSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_BIBLEVERSE":
      return state.map(bibleverse => {
        if (bibleverse.id === action.bibleverse.id) {
          return {
            ...bibleverse,
            ...action.bibleverse
          };
        } else {
          return bibleverse;
        }
      });
    default:
      return state;
  }
};
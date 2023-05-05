// Type Definitions
type EditFormState = {
  title: string;
  content: string;
  isValid: boolean;
};

type EditFormAction =
  | { type: "INPUT_TITLE"; value: string }
  | { type: "INPUT_CONTENT"; value: string }

// Initial state
export const editFormInitialState: EditFormState = {
  title: "",
  content: "",
  isValid: false,
};

// Reducer
export const editFormReducer = (state: EditFormState, action: EditFormAction): EditFormState => {
  switch (action.type){
    case "INPUT_TITLE":
      return {
        ...state,
        title: action.value,
        isValid: action.value.trim().length > 0 && state.content.trim().length > 0
      }
    case "INPUT_CONTENT":
      return {
        ...state,
        content: action.value,
        isValid: action.value.trim().length > 0 && state.title.trim().length > 0
      }

    default:
      return state;
  }
};

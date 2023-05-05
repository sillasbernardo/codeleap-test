// Type Definitions
type PostFormState = {
  title: string;
  content: string;
  isValid: boolean;
};

type PostFormAction =
  | { type: "INPUT_TITLE"; value: string }
  | { type: "INPUT_CONTENT"; value: string }
  | { type: "RESET_FIELDS" } 

// Initial state
export const postFormInitialState: PostFormState = {
  title: "",
  content: "",
  isValid: false,
};

// Reducer
export const postFormReducer = (state: PostFormState, action: PostFormAction): PostFormState => {
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
    case "RESET_FIELDS":
      return {
        title: "",
        content: "",
        isValid: false
      }

    default:
      return state;
  }
};

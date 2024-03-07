import { useState } from "react";

const useInput = (validator) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validator(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const InputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    InputBlurHandler,
    reset,
  };
};

export default useInput;

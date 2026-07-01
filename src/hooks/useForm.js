import { useState, useCallback } from "react";

export function useForm(initialValues = {}, validationRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (validationRules[name]) {
      const error = validationRules[name](value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  }, [validationRules]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (validationRules[name]) {
      const error = validationRules[name](values[name]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  }, [validationRules, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0 && Object.values(errors).every((e) => !e);

  return { values, errors, touched, handleChange, handleBlur, reset, isValid, setValues };
}

export default useForm;

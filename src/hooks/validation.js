import { useEffect, useRef, useState } from "react";
import { capitalize } from "../utils/string";

export const useValidation = (schema) => {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});

  const useField = (key) => {
    const firstUpdate = useRef(true);
    const [fieldRef, setFieldRef] = useState("");

    useEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }

      try {
        const result = schema.validateSyncAt(key, { [key]: fieldRef });

        if (result) {
          setErrors((values) => ({
            ...values,
            [key]: "",
          }));
        }
      } catch (error) {
        const { message } = error;
        setErrors((values) => ({
          ...values,
          [key]: capitalize(message),
        }));
      }
    }, [fieldRef, key]);

    useEffect(() => {
      setFields((values) => ({
        ...values,
        [key]: fieldRef,
      }));
    }, [fieldRef, key]);

    return {
      [`${key}Field`]: fieldRef,
      [`set${capitalize(key)}Field`]: setFieldRef,
    };
  };

  const validateForm = () => {
    try {
      schema.validateSync(fields, {
        abortEarly: false,
      });

      return true;
    } catch (error) {
      const { inner } = error;

      inner.forEach((item, index) => {
        const { path, message } = item;

        const errorFirstOccurence = inner.findIndex(
          (item) => item.path === path
        );

        if (errorFirstOccurence !== index) return;

        setErrors((values) => ({
          ...values,
          [path]: capitalize(message),
        }));
      });

      return false;
    }
  };

  return {
    fields,
    errors,
    useField,
    validateForm,
  };
};

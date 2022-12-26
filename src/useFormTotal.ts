import React, {useState} from "react";

export type TotalFormFields = {
    price: number | string,
    provinceId: number,
    tips: number
}

export const useFormTotal = (): [TotalFormFields, (event:React.ChangeEvent<HTMLInputElement>)=>void] => {
    const {fields, handleChange} = useForm<TotalFormFields>({
        price: '',
        provinceId: 1,
        tips: 0
    })

    return [
        fields,
        handleChange
    ]
}

function useForm<T>(initialFields: T) {
    const [fields, setFields] = useState(initialFields);

    const handleChange = React.useCallback(
        ({target}: React.ChangeEvent<HTMLInputElement>) => setFields((prevFields) => ({
            ...prevFields,
            [target.name]: Number(target.value)||undefined
        })),
        []
    );

    const reset = React.useCallback(() => {
        setFields(initialFields);
    }, [initialFields]);

    return { fields, handleChange, reset };
}

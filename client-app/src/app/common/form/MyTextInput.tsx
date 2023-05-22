import { useField } from 'formik';
import React from 'react';
import { Form, FormField, Label } from 'semantic-ui-react';

interface IProps {
    placeholder: string;
    name: string;
    label?: string;
}

const MyTextInput = (props: IProps) => {
    const [field, meta] = useField(props.name);
    return (
        // !!meta.error (casting to a boolean)
        <Form.Field error={meta.touched && !!meta.error}> 
            <label>{props.label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    );
}

export default MyTextInput;
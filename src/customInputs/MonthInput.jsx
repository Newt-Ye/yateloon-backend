import * as React from 'react';
import clsx from 'clsx';
import TextField from '@mui/material/TextField';
import { useInput, FieldTitle, mergeRefs } from 'ra-core';
import { InputHelperText } from 'ra-ui-materialui';

/**
 * A Month picker input compatible with React-Admin forms.
 *
 * Renders a <input type="month" />, and transforms its value into a yyyy-MM-01 format.
 */
const getStringFromMonth = (value) => {
    if (!value) return '';
    const date = new Date(value);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    return `${year}-${month}`;
};

const parseMonthToDateString = (value) => {
    if (!value) return '';
    if (typeof value === 'string' && /^\d{4}-\d{2}$/.test(value)) {
        return `${value}-01`;
    }
    const date = new Date(value);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    return `${year}-${month}-01`;
};

export const MonthInput = ({
    className,
    defaultValue,
    format = getStringFromMonth,
    label,
    source,
    resource,
    helperText,
    margin = 'dense',
    onBlur,
    onChange,
    onFocus,
    parse = parseMonthToDateString,
    validate,
    variant = 'outlined',
    disabled,
    readOnly,
    ...rest
}) => {
    const {
        field,
        fieldState,
        id,
        isRequired,
    } = useInput({
        defaultValue,
        onBlur,
        resource,
        source,
        validate,
        disabled,
        readOnly,
        ...rest,
    });

    const localInputRef = React.useRef();
    const { error, invalid } = fieldState;
    const renderHelperText = helperText !== false || invalid;
    const inputRef = mergeRefs([field.ref, localInputRef]);

    const handleChange = (event) => {
        const value = event.target.value;
        if (value) {
            const formatted = parse(value);
            field.onChange(formatted);
        } else {
            field.onChange('');
        }
        if (onChange) onChange(event);
    };

    return (
        <TextField
            id={id}
            name={field.name}
            inputRef={inputRef}
            type="month"
            value={getStringFromMonth(field.value)}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={field.onBlur}
            className={clsx('ra-input', `ra-input-${source}`, className)}
            size="small"
            variant={variant}
            margin={margin}
            error={invalid}
            disabled={disabled || readOnly}
            readOnly={readOnly}
            helperText={
                renderHelperText ? (
                    <InputHelperText error={error?.message} helperText={helperText} />
                ) : null
            }
            label={
                <FieldTitle
                    label={label}
                    source={source}
                    resource={resource}
                    isRequired={isRequired}
                />
            }
            InputLabelProps={{ shrink: true }}
            inputProps={{
                style: {
                    padding: '10.5px 14px',
                },
            }}
            {...rest}
        />
    );
};

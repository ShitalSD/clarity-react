import * as React from 'react';
import * as utils from '../../utils';
import {ReactNode} from "react";

type InputProps = {
    className?: string
    type?: string
    disabled?: boolean
    helperText?: ReactNode
    label?: string
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    name: string
};

const initialState = {value: null};

type InputState = Readonly<typeof initialState>;

export class Input extends React.PureComponent<InputProps> {
    readonly state: InputState = initialState;

    private handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: evt.target.value});
        const {onChange} = this.props;
        if (onChange) onChange(evt);
    }

    private static renderHelperText(helperText: ReactNode): ReactNode {
        return (
            <span className="clr-subtext">{helperText}</span>
        );
    }

    private static renderLabel(label: string) {
        return (<label className="clr-control-label">{label}</label>);
    }

    render() {
        const {
            className,
            disabled,
            helperText,
            label,
            placeholder,
            type
        } = this.props;
        let classNames = ["clr-control-container", className];
        if (disabled)
            classNames.push("clr-form-control-disabled");
        return (
            <div className="clr-form-control">
                {label && Input.renderLabel(label)}
                <div className={utils.classNames(classNames)}>
                    <div className="clr-input-wrapper">
                        <input type={type || "text"}
                               id={name}
                               className="clr-input"
                               placeholder={placeholder}
                               onChange={this.handleChange}
                        />
                    </div>
                    {helperText && Input.renderHelperText(helperText)}
                </div>
            </div>
        );
    }
}
import React from "react";
import './InputCommon.scss';

export default function InputColor(props) {
    return (
        <div className='input'>
            <label className='input__label'>{props.label}</label>
            <input className='input__input' type='color' value={props.value || '#000'} onChange={props.onChange} />
        </div>
    );
}
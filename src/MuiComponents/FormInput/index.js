import React from 'react';



const FormInput = (props) => {
    return <label htmlFor=""
    >{props.label} <input
        onChange={props.handleChange}
        name={props.name}
        placeholder={props.placeholder}
        onClick={props.handleClick}
        id={props.id}
        className={props.classname}
    >

        {props.option}
    </input></label>
};

export default FormInput;
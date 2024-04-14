import React from "react";

export function TextInput({label, name, value, placeholder, type, onChange, onBlur}){
    return (
        <div className="py-1 mx-auto">
            <label className="block text-stone-600 p-2 pb-1 w-5/12">{label}</label>
            <input className="block bg-white shadow-sm focus:outline-none rounded-md focus:shadow-md p-2 
            focus:text-stone-600 text-stone-400 w-full" name={name} value={value} type={type} 
            placeholder={placeholder} onChange={onChange} onBlur={onBlur} />
        </div>
    );
}

export function SubmitButton({buttonText, onClick, disabled=false}){
    return (
        <div className="my-4">
            <button className="block w-full p-3 mx-auto bg-lime-500 hover:bg-lime-600
            rounded-xl text-stone-200 disabled:bg-lime-300 disabled:text-stone-400" onClick={onClick} disabled={disabled}>{buttonText}</button>
        </div>
    )
}


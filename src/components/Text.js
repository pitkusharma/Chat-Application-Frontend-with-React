import React from "react";
import { Link } from "react-router-dom";

export function ErrorMessage({message}){
    return (
        <div className="p-3 text-red-700">
            {message !== ''? '*' + message : ''}
        </div>
    )
}

export function SuccessMessage({message}){
    return (
        <div className="p-3 text-green-700">
            {message !== ''? '*' + message : ''}
        </div>
    )
}

export function SmallText({children}){
    return (
        <div className="text-stone-400">
            {children}
        </div>
    )
}

export function BlueLink({text, linkTo}){
    return (
        <Link to={linkTo}>
            <span className="underline text-blue-500">{text}</span>
        </Link>
    )
}
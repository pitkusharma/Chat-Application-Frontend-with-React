import React from "react";


export function CenterCard (props){
    const { children } = props
    return (
        <div className="flex items-center justify-center h-screen w-screen m-0 bg-stone-100">
            <div className="w-2/5 p-5 rounded-xl border border-stone-200 shadow-lg bg-stone-50">
                {children}
            </div>
        </div>
    );
}
import React from "react";
import {Link} from "react-router-dom"
import { CenterCard } from "../components/Cards";
function NotFound(){
    return (
        <CenterCard>
            <div className="text-8xl font-semibold text-stone-600">404</div>
                <div className="text-4xl text-stone-400">Page Not Found.</div>
                <div className="border-t border-gray-400 my-4"></div>
                <div className="text-base text-stone-400">Make sure you have typed correct url in the browser.<br />
                Click here to <Link to="/login">
                <span className="underline text-blue-500">Login</span>
                </Link> or <Link to="/signup">
                <span className="underline text-blue-500">Signup</span>
                </Link>.
            </div>
        </CenterCard>
    );
}

export default NotFound;
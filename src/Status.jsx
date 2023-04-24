import { MESSAGES } from "./constants";
import './Status.css';


function Status({error}){

    const message = MESSAGES[error] || MESSAGES.default

    return(
        <div>
            <p className="err_msg">{message}</p>
        </div>
    )
}

export default Status;
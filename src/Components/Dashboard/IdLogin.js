
/********************Imports******************** */
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {apiBaseUrl} from "../../Config";

/********************Imports******************** */
const tokenApiUrl = `${apiBaseUrl}/api/admin/auth/token`;

/*********************Components****************** */
function IdLogin()
{
    const history = useHistory();
    
    //Getting the institute id
    const instId = useParams().instId;

    //Getting the token
    useEffect(() => getToken(instId, history), []);

    return (
        <div className="content-wrapper d-flex align-items-center justify-content-center">
            <h1 className="text-center" id="id-login-txt">Logging In</h1>
        </div>
    );
}

/********************Functions******************** */
function getToken(instId, history)
{
    fetch(tokenApiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({instId})
    })
    .then((resp) => {
        if(resp.status !== 200)
            throw Error(resp.status);
        return resp.json();
    })
    .then((data) => {
        if(!data.success)
            throw Error(data.msg);
        localStorage.setItem("token", data.token);
        history.replace("/admin/dashboard");
    })
    .catch((err) => {
        console.log(err);
        alert("Failed to get token");
    })
}

/********************Exports******************** */
export default IdLogin;
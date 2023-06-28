import { useState } from "react";

export default function UIMainApp() {

    return (
        <>
            <div class="top_square"></div>
            <p class="top_name">GAI NATSUMI</p>
        </>
    )
}


export function SignUpForm(){
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");

    const handleSubmit = (event) =>{
        event.preventDefault();
        alert(`${email}         ${password}`)
      }

    return (
        <div className="middle_square">
            <p className="Name">
                LOG IN
            </p>
            <form  onSubmit={handleSubmit}>
                <input className="inputField" type="text" style={{top: "40%"}} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                <input className="inputField" type="text" style={{top: "55%"}} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                <input className="sign_button" type="submit" value ="Sign in" style ={{right: "270px", bottom: "25px"}}></input>
            </form>
            <p style={{position: "absolute", top: "83%", left: "50px", backgroundColor: "#313233"}}>
                Not have a account? <a path="sign_up" style={{color: "rgb(172, 170, 166)", backgroundColor: "#313233"}}> Sign up</a>
            </p>
        </div>
    )
}
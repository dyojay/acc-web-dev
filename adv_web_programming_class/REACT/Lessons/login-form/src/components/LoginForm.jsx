import { useState } from "react";

const LoginForm = ()=>{
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => {
        setShowPassword(!showPassword) 
    }
    return (
        <form className = "form">
            <p>Password Exercise</p>
            <input type={showPassword ? "text" : "password"}  id="password" placeholder="Enter Your Password" />
            <input type="checkbox" onChange={handleShowPassword} />
            <button type="submit"> Submit </button>
        </form>
    );
};

export default LoginForm;

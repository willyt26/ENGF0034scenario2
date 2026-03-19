import { useState } from 'react';

const Login = ({ onLogin }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = () => {
        if (name == "") {
            setError("No name has been entered")
            return
        }
        if (!email.endsWith("@ucl.ac.uk")) {
            setError("Invalid email")
            return    
        }
        onLogin({name, email}) 
    }
    return (
        <div style={{ textAlign: 'center', marginTop: '20vh' }}>
            <h1> Login </h1>
            <p> Enter name </p>
            <input onChange={(e) => setName(e.target.value)}/>
            <p> Enter email </p>
            <input onChange={(e) => setEmail(e.target.value)}/>
            <br/>
            <br/>
            {error && <p>{error}</p>} {/* If error isnt empty display error */}
            <button onClick={handleSubmit}> Submit </button>
        </div>
    );
} 

export default Login;
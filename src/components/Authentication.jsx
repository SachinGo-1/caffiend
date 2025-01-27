import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Authentication(props) {

    const { handleCloseModal } = props
    const [isRegistration, setIsRegistration] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [error, setError] = useState(null)

    const {signup, login, resetPassword} = useAuth()

    async function handleAuthenticate() {
        if(!email || !email.includes('@') || !password || password.length < 6 || isAuthenticating) { return }

        try {
            setIsAuthenticating(true)
            setError(null)
            if(isRegistration){
               await signup(email, password)
            } else {
                await login(email, password)
            }
            handleCloseModal()
        } catch (err) {
            console.log(err.message)
            setError(err.message)
        } finally {
            setIsAuthenticating(false)
        }
    }

    async function resetbutton() {
        if(!email || !email.includes('@') ) {
            alert('enter correct email')
        }
        try {
            await resetPassword(email)
            console.log("Password reset email sent!");
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
          <h2 className="sign-up-text">{isRegistration ? 'Sign Up' : 'Login'}</h2>
            <p>{isRegistration ? 'Create an account!' : 'Sign in to your account!'}</p>
            {error && (
                <p>❌ {error}</p>
            )}
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="********" type="password" />
            <button onClick={handleAuthenticate}><p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p></button>
            <hr />
            <div className="register-content">
                <p>{isRegistration ? 'Already have an account?' : 'Don\'t have an account?'}</p>
                <button onClick={() => { setIsRegistration(!isRegistration) }}><p>{isRegistration ? 'Sign in' : 'Sign up'}</p></button>
            </div>
            <button onClick={resetbutton}>Password Reset Button</button>
        </>
    )
}




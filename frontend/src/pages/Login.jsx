import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UseDispatch, useDispatch, useSelector } from "react-redux"
import { signinUser } from "../store/slices/auth"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [errors, setErrors] = useState("")
    const {error, user, success} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (error) toast.error(error)
    },[error])
    useEffect(() => {
        if (success)navigate("/upload")
    },[success])

    const handleEmailChange = (e) =>  setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            dispatch(signinUser({email, password}))
        
        } catch (error) {
            console.log(error)
        }
    }

    return <div className="flex border-black border-2 justify-center items-center flex-col " style={{height:'100vh'}}>
        <h2 className="mb-5">Log In</h2>
        <form>
            <div className="flex gap-1 flex-col items-start mb-2" >
            <label htmlFor="">Email</label>
            <input type="email" required value={email} onChange={handleEmailChange} className="border-black border-2 pt-2 pb-2 pr-2 pl-2"/>
            </div>
            <div className="flex gap-1 flex-col items-start mb-2">
                <label htmlFor="">Password</label>
                <input type="password" name="" id="" min={6} required value={password} onChange={handlePasswordChange} className="border-black border-2 pt-2 pb-2 pr-2 pl-2"/>
            </div>
            <div>
                <button onClick={handleSubmit} type="submit" className="border-1 bg-blue-900 text-color-blue py-2 px-4 rounded text-white">Login</button>
            </div>
            <div className="mt-4">
                <div className="flex gap-2">Don't have account <Link to={"/signup"} ><p className="text-blue underline">Sign Up</p></Link> </div>
            </div>
        </form>
        <ToastContainer type='error' />
    </div>
}

export default Login
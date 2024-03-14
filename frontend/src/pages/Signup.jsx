import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { signupUser } from "../store/slices/auth"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {error} = useSelector(state => state.auth)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (error) toast.error(error)
    },[error])
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            dispatch(signupUser({email, password}))
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    const handleEmailChange = (e) =>  setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)

    return <div className="flex border-black border-2 justify-center items-center flex-col" style={{height:'100vh'}}>
        <h4>Sign Up </h4>
        <form onSubmit={handleSubmit}>
            <div className="flex gap-1 flex-col items-start mb-2" >
            <label htmlFor="">Email</label>
            <input type="email" required value={email} onChange={handleEmailChange} className="border-black border-2 pt-2 pb-2 pr-2 pl-2"/>
            </div>
            <div className="flex gap-1 flex-col items-start mb-2">
                <label htmlFor="">Password</label>
                <input type="password" name="" id="" min={6} required value={password} onChange={handlePasswordChange} className="border-black border-2 pt-2 pb-2 pr-2 pl-2"/>
            </div>
            <div>
                <button type="submit" className="border-1 bg-blue-900 text-color-blue py-2 px-4 rounded text-white">Signup</button>
            </div>
            <div className="mt-4">
                <p className="flex gap-2">Alreay have account <Link to={"/login"} ><p className="text-blue underline">Sign In</p></Link> </p>
            </div>
        </form>
        <ToastContainer  />
    </div>
}

export default Signup
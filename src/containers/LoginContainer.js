import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CenterCard } from "../components/Cards";
import {TextInput, SubmitButton} from "../components/InputFields";
import { HeadingMedium } from "../components/Headings";
import { ErrorMessage, SmallText, BlueLink } from "../components/Text";
import { unAuthorizedFetch } from "../utils/apiCall";

export default function LoginContainer(){
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState('')
    const [disabled, setDisabled] = useState(true)
    const navigate = useNavigate()

    const handleFormData = ({target}) => {
        const {name, value} = target
        setFormData({...formData, [name]: value})
    }

    const handleBlur = ({target}) => {
        if (formData.email !== '' && formData.password !== ''){
            setDisabled(false)
            setErrorMessage('')
        }
        else{
            setDisabled(true)
        }
    }

    const handleLogin = async () => {
        try {
            const loginResponse = await unAuthorizedFetch('/auth/login/', 'POST', {}, { 
                username: formData.username,
                password: formData.password
            })
            responseBody = await loginResponse.json()
            if (!loginResponse.ok){
                setErrorMessage(responseBody.message)
                return
            }
            localStorage.setItem('accessToken', responseBody.access_token)
            localStorage.setItem('refreshToken', responseBody.refresh_token)
            navigate('/')

        }catch (error){
            setErrorMessage("Unexpected error occured.")
        }
    }

    return (
        <>
            <CenterCard>
                <HeadingMedium
                text="Login To Your Account"/>
                <TextInput 
                name='username'
                value={formData.username}
                onChange={handleFormData}
                onBlur={handleBlur}
                label="Username"
                type="text"
                placeholder="Please Enter Username" />
                <TextInput
                name='password'
                value={formData.password}
                onChange={handleFormData}
                onBlur={handleBlur}
                label="Password"
                type="password"
                placeholder="Please Enter Password" />
                <ErrorMessage message={errorMessage} />
                <SubmitButton buttonText={"Login"} onClick={handleLogin} disabled={disabled}/>
                <SmallText>
                    If you don't have account <BlueLink 
                    text="Signup" 
                    linkTo="/signup" /> here.
                </SmallText>
            </CenterCard>
        </>
    )
}
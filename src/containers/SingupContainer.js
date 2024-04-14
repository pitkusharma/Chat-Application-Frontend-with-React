import React, { useState, useEffect } from "react";
import { CenterCard } from "../components/Cards";
import { TextInput, SubmitButton } from "../components/InputFields";
import { ErrorMessage, SmallText, SuccessMessage } from "../components/Text";
import { HeadingMedium } from "../components/Headings";
import { BlueLink } from "../components/Text";
import config from "../../config";

export default function SignupContainer () {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: ''
    })
    const [errorMessage, setErrorMessage] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [successMessage, setSuccesMessage] = useState('')

    function handleFormDataChange({target}){
        const {name, value} = target
        nameRegex = /^[A-Za-z\s]+$/
        if (['firstName', 'lastName'].includes(name) && !nameRegex.test(value) && value !== ''){
            setErrorMessage("Name can only contain letters A-Z")
            return
        }
        else if(name == 'password' && value.length < 4){
            setErrorMessage('Password needs to be atleast of 4 characters')
        }
        else if(name === 'confirmPassword' && value !== formData.password){
            setErrorMessage('Please write same password in the Confirm Pasword')
        }
        else{
            setErrorMessage('')
        }
        setFormData({...formData, [name]: value})
    }

    function handleBlur({ target }){
        if (errorMessage !== ''){
            setDisabled(true)
            return
        }
        for (field in formData){
            if (formData[field] === ''){
                setDisabled(true)
                return
            }
        }
        setDisabled(false)
    }

    async function handleSubmit(){
        try {
            const submitResponse = await fetch(`${config.backend.protocol}://${config.backend.host}:${config.backend.port}/users/create/`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    username: formData.username,
                    password: formData.password
                })
            })
            responseBody = await submitResponse.json()
            if (!submitResponse.ok){
                setErrorMessage(responseBody.message)
                return
            }
            setSuccesMessage('Your account is now created, go to the login page.')
            setFormData({
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                confirmPassword: ''
            })
            setDisabled(true)


        }catch (error){
            setErrorMessage("Unexpected error occured.")
            setClickedStatus(false)
        }
    }

    return (
        <>
        <CenterCard>
            <HeadingMedium text="Signup For an Account"/>
            <TextInput
            name="firstName" label="First Name" type="text"
            placeholder="Enter your first name" value={formData.firstName} 
            onChange={handleFormDataChange}
            onBlur={handleBlur}
            />
            <TextInput
            name="lastName" label="Last Name" type="text"
            placeholder="Enter your last name" value={formData.lastName}
            onChange={handleFormDataChange}
            onBlur={handleBlur}
            />
            <TextInput
            name="username" label="Username" type="text"
            placeholder="Provide an unique username"
            value={formData.username} onChange={handleFormDataChange}
            onBlur={handleBlur}
             />
            <TextInput
            name="password" label="Set Password" type="password"
            placeholder="Password" value={formData.password}
            onChange={handleFormDataChange}
            onBlur={handleBlur}
            />
            <TextInput
            name="confirmPassword" label="Confirm Password" type="password"
            placeholder="Password" value={formData.confirmPassword}
            onChange={handleFormDataChange}
            onBlur={handleBlur}
            />
            <ErrorMessage message={errorMessage} />
            <SuccessMessage message={successMessage} />
            <SubmitButton buttonText={"Signup"} onClick={handleSubmit} disabled={disabled}/>
            <SmallText>
                    To Login <BlueLink 
                    text="Click" 
                    linkTo="/login" /> here.
            </SmallText>
        </CenterCard>
        </>
    )
}
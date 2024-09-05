import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // To navigate after successful signup
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user' // Assuming 'user' role by default
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users', {
                name: `${formData.firstName} ${formData.lastName}`, // Adjust according to your backend expectations
                email: formData.email,
                password: formData.password,
                role: formData.role
            });
            console.log('User created:', response.data);
            navigate('/'); // Redirect to home or other page
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data.errors); // Handling Laravel validation errors
            } else {
                console.error('Error submitting form:', error);
            }
        }
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" name="firstName" placeholder="Max" required onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" name="lastName" placeholder="Robinson" required onChange={handleChange} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" required onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required onChange={handleChange} />
                    </div>
                    <Button type="submit" className="w-full">Create an account</Button>
                </form>
                {Object.keys(errors).length > 0 && (
                    <div className="mt-4">
                        <ul>
                            {Object.keys(errors).map(key => (
                                <li key={key}>{errors[key]}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="mt-4 text-center text-sm">
                    Already have an account? <Link to="/login" className="underline">Sign in</Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default SignupForm;
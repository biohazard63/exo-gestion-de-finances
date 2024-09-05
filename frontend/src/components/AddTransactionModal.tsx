import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Importing the RadioGroup components

function AddTransactionDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        user_id: '', // This will be set from local storage
        amount: '',
        type: 'credit', // Defaulting to 'credit'
        customerName: '',
        description: ''
    });

    useEffect(() => {
        // Retrieve the user_id from local storage and set it in the state
        const userId = localStorage.getItem('userId');
        if (userId) {
            setFormData(prevFormData => ({
                ...prevFormData,
                user_id: userId // Setting the user_id fetched from local storage
            }));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/transactions', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data); // Handle success
            setIsOpen(false);
            // Add code to close the dialog if necessary
        } catch (error) {
            console.error('Failed to add transaction:', error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Ajouter une transaction</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Ajouter une transaction</DialogTitle>
                        <DialogDescription>
                            Remplissez les détails ci-dessous pour ajouter une nouvelle transaction.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                                Montant
                            </Label>
                            <Input id="amount" name="amount" type="number" value={formData.amount}
                                   onChange={handleChange} className="col-span-3" required/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Type
                            </Label>
                            <RadioGroup name="type" defaultValue={formData.type}
                                        onValueChange={value => setFormData({...formData, type: value})}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="credit" id="credit"/>
                                    <Label htmlFor="credit">Crédit</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="debit" id="debit"/>
                                    <Label htmlFor="debit">Débit</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="customerName" className="text-right">
                                Nom du client
                            </Label>
                            <Input id="customerName" name="customerName" value={formData.customerName}
                                   onChange={handleChange} className="col-span-3"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input id="description" name="description" value={formData.description}
                                   onChange={handleChange} className="col-span-3"/>
                        </div>
                    </div>
                    <DialogFooter>

                        <DialogClose asChild>
                            <Button type="submit">Ajouter</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddTransactionDialog;
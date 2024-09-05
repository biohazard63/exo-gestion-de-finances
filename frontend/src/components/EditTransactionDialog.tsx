import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function EditTransactionDialog({ transaction, onClose, onSave }) {
    const [formData, setFormData] = useState({
        customerName: transaction.customerName,
        amount: transaction.amount,
        type: transaction.type,
        description: transaction.description
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTypeChange = (type) => {
        setFormData({ ...formData, type });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:8000/api/transactions/${transaction.id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onSave(response.data); // Notify parent component of the update
            onClose(); // Close the dialog
        } catch (error) {
            console.error('Failed to update transaction:', error);
        }
    };

    return (
        <Dialog isOpen={!!transaction} onDismiss={onClose}>
            <DialogTrigger asChild>
                <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Transaction</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div>
                            <Label htmlFor="customerName">Customer Name</Label>
                            <Input id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="amount">Amount</Label>
                            <Input id="amount" name="amount" type="number" value={formData.amount} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>Type</Label>
                            <RadioGroup defaultValue={formData.type} onValueChange={handleTypeChange}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="credit" id="credit" />
                                    <Label htmlFor="credit">Credit</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="debit" id="debit" />
                                    <Label htmlFor="debit">Debit</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" name="description" value={formData.description} onChange={handleChange} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditTransactionDialog;
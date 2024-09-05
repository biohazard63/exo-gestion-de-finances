import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AddTransactionDialog from "@/components/AddTransactionModal.tsx";

function Gestion() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token is missing or invalid.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('http://localhost:8000/api/my-transactions', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTransactions(response.data);
            setError(null);
        } catch (error) {
            console.error('Erreur lors de la récupération des transactions:', error);
            setError('Failed to fetch transactions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const calculateTotals = transactions => transactions.reduce((acc, transaction) => {
        if (transaction.type === 'debit') {
            acc.totalDebit += parseFloat(transaction.amount);
        } else if (transaction.type === 'credit') {
            acc.totalCredit += parseFloat(transaction.amount);
        }
        return acc;
    }, { totalDebit: 0, totalCredit: 0 });

    const { totalDebit, totalCredit } = calculateTotals(transactions);
    const total = totalDebit + totalCredit;

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total des débits</CardTitle>
                            <DollarSign />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${totalDebit.toFixed(2)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total des crédits</CardTitle>
                            <Users />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${totalCredit.toFixed(2)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total des transactions</CardTitle>
                            <CreditCard />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${total.toFixed(2)}</div>
                        </CardContent>
                    </Card>
                </div>
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Transactions récentes</CardTitle>
                        <AddTransactionDialog />
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <p>Chargement des transactions...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <Table>
                                <TableBody>
                                    {transactions.map(transaction => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>{transaction.customerName}</TableCell>
                                            <TableCell>{transaction.type}</TableCell>
                                            <TableCell>
                                                <Badge className="text-xs" variant="outline">{transaction.status}</Badge>
                                            </TableCell>
                                            <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

export default Gestion;
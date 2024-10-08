import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, Users, CreditCard, Edit2, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AddTransactionDialog from "@/components/AddTransactionModal";
import EditTransactionDialog from "@/components/EditTransactionDialog";
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip } from 'recharts';


function Gestion() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);

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

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8000/api/transactions/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTransactions();  // Refresh list after deletion
        } catch (error) {
            console.error('Failed to delete transaction:', error);
        }
    };

    const handleEdit = (transaction) => {
        setCurrentTransaction(transaction);
        setIsEditing(true);
    };

    const handleCloseEditDialog = () => {
        setIsEditing(false);
        setCurrentTransaction(null);
    };

    const handleSaveEdit = (updatedTransaction) => {
        // Implement saving logic here, possibly refreshing the list
        console.log('Transaction updated', updatedTransaction);
        handleCloseEditDialog();
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
    // Prepare chart data
    // Group transactions by month and sum amounts by type
    const chartData = transactions.reduce((acc, cur) => {
        const date = new Date(cur.created_at);
        const day = date.toLocaleDateString('en-CA');  // YYYY-MM-DD format
        if (!acc[day]) {
            acc[day] = { day, debit: 0, credit: 0 };
        }
        if (cur.type === 'debit') {
            acc[day].debit += cur.amount;
        } else {
            acc[day].credit += cur.amount;
        }
        return acc;
    }, {});

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
                            <p>Erreur: {error}</p>
                        ) : (
                            <Table>
                                <TableBody>
                                    {transactions.map(transaction => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>{transaction.customerName}</TableCell>
                                            <TableCell>{transaction.type}</TableCell>
                                            <TableCell>
                                                <Badge className="text-xs"
                                                       variant="outline">{transaction.status}</Badge>
                                            </TableCell>
                                            <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell
                                                className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Button onClick={() => handleEdit(transaction)} title="Modifier">
                                                        <Edit2 size={16}/>
                                                    </Button>
                                                    <Button onClick={() => handleDelete(transaction.id)}
                                                            title="Supprimer">
                                                        <Trash2 size={16}/>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                        {isEditing && <EditTransactionDialog transaction={currentTransaction} onSave={handleSaveEdit}
                                                             onClose={handleCloseEditDialog}/>}

                    </CardContent>
                </Card>
                <Card className="mt-5">
                    <CardHeader>
                        <CardTitle>Daily Transaction Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BarChart width={600} height={300} data={Object.values(chartData)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <Tooltip />
                            <Bar dataKey="debit" fill="#FF6384" name="Debit" />
                            <Bar dataKey="credit" fill="#36A2EB" name="Credit" />
                        </BarChart>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

export default Gestion;
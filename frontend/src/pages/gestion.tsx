import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, Users, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import AddTransactionDialog from "@/components/AddTransactionModal.tsx";

// Utility function to format numbers with spaces as thousand separators
function formatNumberWithSpaces(number: number): string {
    return new Intl.NumberFormat('fr-FR').format(number);
}

function Gestion() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/transactions', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTransactions(response.data);
            calculateTotals(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des transactions:', error);
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotals = (transactions: any[]) => {
        let totalDebit = 0;
        let totalCredit = 0;
        transactions.forEach(transaction => {
            if (transaction.type === 'debit') {
                totalDebit += parseFloat(transaction.amount);
            } else if (transaction.type === 'credit') {
                totalCredit += parseFloat(transaction.amount);
            }
        });

        return { totalDebit, totalCredit, total: totalCredit - totalDebit };
    };

    const { totalDebit, totalCredit, total } = calculateTotals(transactions);

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total des Débits</CardTitle>
                            <DollarSign />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumberWithSpaces(totalDebit.toFixed(2))} €</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total des Crédits</CardTitle>
                            <Users />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumberWithSpaces(totalCredit.toFixed(2))} €</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total des Transactions</CardTitle>
                            <CreditCard />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumberWithSpaces(total.toFixed(2))} €</div>
                        </CardContent>
                    </Card>
                </div>
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Transactions Récentes</CardTitle>
                        <AddTransactionDialog />
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <p>Chargement des transactions...</p>
                        ) : error ? (
                            <p>Erreur de chargement des transactions: {error.message}</p>
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
                                            <TableCell className="text-right">{formatNumberWithSpaces(transaction.amount.toFixed(2))} €</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-5">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-8">
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    Olivia Martin
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    olivia.martin@email.com
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+{formatNumberWithSpaces(1999.00)} €</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage src="/avatars/02.png" alt="Avatar" />
                                <AvatarFallback>JL</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    Jackson Lee
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    jackson.lee@email.com
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+{formatNumberWithSpaces(39.00)} €</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage src="/avatars/03.png" alt="Avatar" />
                                <AvatarFallback>IN</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    Isabella Nguyen
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    isabella.nguyen@email.com
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+{formatNumberWithSpaces(299.00)} €</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage src="/avatars/04.png" alt="Avatar" />
                                <AvatarFallback>WK</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    William Kim
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    will@email.com
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+{formatNumberWithSpaces(99.00)} €</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage src="/avatars/05.png" alt="Avatar" />
                                <AvatarFallback>SD</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    Sofia Davis
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    sofia.davis@email.com
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+{formatNumberWithSpaces(39.00)} €</div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

export default Gestion;
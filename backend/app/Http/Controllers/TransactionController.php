<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * @OA\Get(
     *   path="/api/transactions",
     *   summary="Display a listing of the transactions",
     *   @OA\Response(
     *     response=200,
     *     description="A list of transactions",
     *     @OA\JsonContent(
     *       type="array",
     *       @OA\Items(ref="#/components/schemas/Transaction")
     *     )
     *   )
     * )
     */
    public function index()
    {
        $transactions = Transaction::all();
        return response()->json($transactions);
    }

    /**
     * @OA\Post(
     *   path="/api/transactions",
     *   summary="Store a newly created transaction in storage",
     *   @OA\RequestBody(
     *     @OA\JsonContent(
     *       required={"user_id", "amount", "type"},
     *       @OA\Property(property="user_id", type="integer", example=1),
     *       @OA\Property(property="amount", type="number", format="float", example=100.50),
     *       @OA\Property(property="type", type="string", enum={"credit", "debit"}, example="credit"),
     *       @OA\Property(property="description", type="string", example="Payment for services")
     *     )
     *   ),
     *   @OA\Response(
     *     response=201,
     *     description="Transaction created",
     *     @OA\JsonContent(ref="#/components/schemas/Transaction")
     *   ),
     *   @OA\Response(
     *     response=422,
     *     description="Validation error"
     *   )
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'amount' => 'required|numeric',
            'type' => 'required|in:credit,debit',
            'description' => 'sometimes|string|nullable',
        ]);

        $transaction = Transaction::create([
            'user_id' => $request->user_id,
            'amount' => $request->amount,
            'type' => $request->type,
            'description' => $request->description,
        ]);

        return response()->json($transaction, 201);
    }

    /**
     * @OA\Get(
     *   path="/api/transactions/{id}",
     *   summary="Display the specified transaction",
     *   @OA\Parameter(
     *     name="id",
     *     in="path",
     *     required=true,
     *     @OA\Schema(type="integer")
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="A transaction",
     *     @OA\JsonContent(ref="#/components/schemas/Transaction")
     *   ),
     *   @OA\Response(
     *     response=404,
     *     description="Transaction not found"
     *   )
     * )
     */
    public function show($id)
    {
        $transaction = Transaction::findOrFail($id);
        return response()->json($transaction);
    }

    /**
     * @OA\Put(
     *   path="/api/transactions/{id}",
     *   summary="Update the specified transaction in storage",
     *   @OA\Parameter(
     *     name="id",
     *     in="path",
     *     required=true,
     *     @OA\Schema(type="integer")
     *   ),
     *   @OA\RequestBody(
     *     @OA\JsonContent(
     *       @OA\Property(property="user_id", type="integer", example=1),
     *       @OA\Property(property="amount", type="number", format="float", example=100.50),
     *       @OA\Property(property="type", type="string", enum={"credit", "debit"}, example="credit"),
     *       @OA\Property(property="description", type="string", example="Payment for services")
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Transaction updated",
     *     @OA\JsonContent(ref="#/components/schemas/Transaction")
     *   ),
     *   @OA\Response(
     *     response=404,
     *     description="Transaction not found"
     *   ),
     *   @OA\Response(
     *     response=422,
     *     description="Validation error"
     *   )
     * )
     */
    public function update(Request $request, $id)
    {
        $transaction = Transaction::findOrFail($id);

        $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'amount' => 'sometimes|numeric',
            'type' => 'sometimes|in:credit,debit',
            'description' => 'sometimes|string|nullable',
        ]);

        $transaction->update($request->all());

        return response()->json($transaction);
    }

    /**
     * @OA\Delete(
     *   path="/api/transactions/{id}",
     *   summary="Remove the specified transaction from storage",
     *   @OA\Parameter(
     *     name="id",
     *     in="path",
     *     required=true,
     *     @OA\Schema(type="integer")
     *   ),
     *   @OA\Response(
     *     response=204,
     *     description="Transaction deleted"
     *   ),
     *   @OA\Response(
     *     response=404,
     *     description="Transaction not found"
     *   )
     * )
     */
    public function destroy($id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();

        return response()->json(null, 204);
    }
}

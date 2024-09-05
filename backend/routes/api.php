<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\Api\AuthController;

/**
 * @OA\Get(
 *   path="/api/user",
 *   summary="Get authenticated user",
 *   @OA\Response(
 *     response=200,
 *     description="Authenticated user",
 *     @OA\JsonContent(ref="#/components/schemas/User")
 *   )
 * )
 */
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

/**
 * @OA\Post(
 *   path="/api/users",
 *   summary="Register a new user",
 *   @OA\RequestBody(
 *     @OA\JsonContent(
 *       required={"name", "email", "password", "role"},
 *       @OA\Property(property="name", type="string", example="John Doe"),
 *       @OA\Property(property="email", type="string", format="email", example="johndoe@example.com"),
 *       @OA\Property(property="password", type="string", format="password", example="password"),
 *       @OA\Property(property="role", type="string", example="user")
 *     )
 *   ),
 *   @OA\Response(
 *     response=201,
 *     description="User created",
 *     @OA\JsonContent(ref="#/components/schemas/User")
 *   ),
 *   @OA\Response(
 *     response=422,
 *     description="Validation error"
 *   )
 * )
 */
Route::post('/users', [UserController::class, 'store']);

/**
 * @OA\Post(
 *   path="/api/login",
 *   summary="User login",
 *   @OA\RequestBody(
 *     @OA\JsonContent(
 *       required={"email", "password"},
 *       @OA\Property(property="email", type="string", format="email", example="johndoe@example.com"),
 *       @OA\Property(property="password", type="string", format="password", example="password")
 *     )
 *   ),
 *   @OA\Response(
 *     response=200,
 *     description="Login successful",
 *     @OA\JsonContent(
 *       @OA\Property(property="token", type="string", example="token")
 *     )
 *   ),
 *   @OA\Response(
 *     response=401,
 *     description="Unauthorized"
 *   )
 * )
 */
Route::post('/login', [AuthController::class, 'login']);

/**
 * @OA\Post(
 *   path="/api/logout",
 *   summary="User logout",
 *   @OA\Response(
 *     response=200,
 *     description="Logout successful"
 *   )
 * )
 */
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    /**
     * @OA\Get(
     *   path="/api/users",
     *   summary="Display a listing of the users",
     *   @OA\Response(
     *     response=200,
     *     description="A list of users",
     *     @OA\JsonContent(
     *       type="array",
     *       @OA\Items(ref="#/components/schemas/User")
     *     )
     *   )
     * )
     */
    Route::get('/users', [UserController::class, 'index']);

    /**
     * @OA\Get(
     *   path="/api/users/{id}",
     *   summary="Display the specified user",
     *   @OA\Parameter(
     *     name="id",
     *     in="path",
     *     required=true,
     *     @OA\Schema(type="integer")
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="A user",
     *     @OA\JsonContent(ref="#/components/schemas/User")
     *   ),
     *   @OA\Response(
     *     response=404,
     *     description="User not found"
     *   )
     * )
     */
    Route::get('/users/{id}', [UserController::class, 'show']);

    /**
     * @OA\Put(
     *   path="/api/users/{id}",
     *   summary="Update the specified user in storage",
     *   @OA\Parameter(
     *     name="id",
     *     in="path",
     *     required=true,
     *     @OA\Schema(type="integer")
     *   ),
     *   @OA\RequestBody(
     *     @OA\JsonContent(
     *       @OA\Property(property="name", type="string", example="John Doe"),
     *       @OA\Property(property="email", type="string", format="email", example="johndoe@example.com"),
     *       @OA\Property(property="password", type="string", format="password", example="password"),
     *       @OA\Property(property="role", type="string", example="user")
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="User updated",
     *     @OA\JsonContent(ref="#/components/schemas/User")
     *   ),
     *   @OA\Response(
     *     response=404,
     *     description="User not found"
     *   ),
     *   @OA\Response(
     *     response=422,
     *     description="Validation error"
     *   )
     * )
     */
    Route::put('/users/{id}', [UserController::class, 'update']);

    /**
     * @OA\Delete(
     *   path="/api/users/{id}",
     *   summary="Remove the specified user from storage",
     *   @OA\Parameter(
     *     name="id",
     *     in="path",
     *     required=true,
     *     @OA\Schema(type="integer")
     *   ),
     *   @OA\Response(
     *     response=204,
     *     description="User deleted"
     *   ),
     *   @OA\Response(
     *     response=404,
     *     description="User not found"
     *   )
     * )
     */
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    /**
     * @OA\Get(
     *   path="/api/transactions",
     *   summary="Display a listing of the transactions",
     *   @OA\Response(
     *     response=200,
     *     description="A list of transactions",
     *     @OA\JsonContent(
     *       type="array",
     *       @OA\Items(ref="#/components/schemas/Gestion")
     *     )
     *   )
     * )
     */
    Route::get('/transactions', [TransactionController::class, 'index']);

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
     *     @OA\JsonContent(ref="#/components/schemas/Gestion")
     *   ),
     *   @OA\Response(
     *     response=404,
     *     description="Gestion not found"
     *   )
     * )
     */
    Route::get('/transactions/{id}', [TransactionController::class, 'show']);

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
     *     description="Gestion created",
     *     @OA\JsonContent(ref="#/components/schemas/Gestion")
     *   ),
     *   @OA\Response(
     *     response=422,
     *     description="Validation error"
     *   )
     * )
     */
    Route::post('/transactions', [TransactionController::class, 'store']);

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
     *     description="Gestion updated",
     *     @OA\JsonContent(ref="#/components/schemas/Gestion")
     *   ),
     *   @OA\Response(
     *     response=404,
     *     description="Gestion not found"
     *   ),
     *   @OA\Response(
     *     response=422,
     *     description="Validation error"
     *   )
     * )
     */
    Route::put('/transactions/{id}', [TransactionController::class, 'update']);

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
     *     description="Gestion deleted"
     *   ),
     *   @OA\Response(
     *     response=404,
     *     description="Gestion not found"
     *   )
     * )
     */
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);
});

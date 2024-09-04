<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Création de la table 'transactions'
        Schema::create('transactions', function (Blueprint $table) {
            $table->id(); // Identifiant unique de la transaction
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Clé étrangère vers 'users' (utilisateur associé)
            $table->decimal('amount', 15, 2); // Montant de la transaction
            $table->enum('type', ['credit', 'debit']); // Type de transaction: 'credit' ou 'debit'
            $table->text('description')->nullable(); // Description de la transaction (optionnel)
            $table->timestamps(); // Timestamps pour 'created_at' et 'updated_at'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Suppression de la table 'transactions'
        Schema::dropIfExists('transactions');
    }
};

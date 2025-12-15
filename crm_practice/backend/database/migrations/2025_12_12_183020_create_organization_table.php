<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('organization', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('parent_id')->nullable();
            $table->string('name');
            $table->string('type')->default('parent');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('website')->nullable();
            $table->text('address')->nullable();
            $table->string('status')->default('active');
            $table->timestamps(); //@ Pone por default created at y updated at 
            $table->softDeletes(); //@ 

            // $table->foreign('parent_id')
            //     ->references('id')
            //     ->on('organizations')
            //     ->onDelete('cascade');
        });

        //& Agregar columna LTree
        // DB::statement('ALTER TABLE organizations ADD COLUMN path ltree');
        // DB::statement('CREATE INDEX organizations_path_gist_idx ON organizations USING GIST (path)');
    }

    public function down(): void
    {
        Schema::dropIfExists('organization');
    }
};

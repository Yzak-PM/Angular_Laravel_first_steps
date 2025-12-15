<?php

namespace app\Providers;

use Illuminate\Support\ServiceProvider;
use app\Repositories\OrganizationRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // REGISTRAR NUESTROS REPOSITORIOS
        $this->app->bind(OrganizationRepository::class, function ($app) {

            return new OrganizationRepository(new \app\Models\Organization());
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
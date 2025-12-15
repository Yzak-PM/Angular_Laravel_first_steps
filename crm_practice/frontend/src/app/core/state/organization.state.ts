import { Injectable, inject, signal, computed } from '@angular/core';
import { ApiService, PaginatedResponse, ApiResponse } from '../services/api.service';
import { Organization, OrganizationFilters, CreateOrganizationDto } from '../models/organization.model';

@Injectable({ providedIn: 'root' })
export class OrganizationState {
    private api = inject(ApiService);
    // ═══════════════════════════════════════════
    // PRIVATE SIGNALS (solo el state puede modificar)
    // ═══════════════════════════════════════════
    private _organizations = signal<Organization[]>([]);
    private _selectedOrganization = signal<Organization | null>(null);
    private _isLoading = signal<boolean>(false);
    private _error = signal<string | null>(null);
    private _pagination = signal({
        currentPage: 1,
        lastPage: 1,
        perPage: 15,
        total: 0
    });

    // ═══════════════════════════════════════════
    // PUBLIC SIGNALS (solo lectura para componentes)
    // ═══════════════════════════════════════════
    readonly organizations = this._organizations.asReadonly();
    readonly selectedOrganization = this._selectedOrganization.asReadonly();
    readonly isLoading = this._isLoading.asReadonly();
    readonly error = this._error.asReadonly();
    readonly pagination = this._pagination.asReadonly();

    // ═══════════════════════════════════════════
    // COMPUTED SIGNALS (valores derivados)
    // ═══════════════════════════════════════════
    readonly hasOrganizations = computed(() => this._organizations().length > 0);
    readonly totalCount = computed(() => this._pagination().total);
    readonly parentOrganizations = computed(() => 
        this._organizations().filter(org => org.type === 'parent')
    );

    // ═══════════════════════════════════════════
    // ACTIONS (métodos que modifican el estado)
    // ═══════════════════════════════════════════
    loadOrganizations(filters: OrganizationFilters = {}): void {
        this._isLoading.set(true);
        this._error.set(null);
        this.api.get<PaginatedResponse<Organization>>('organizations', filters)
        .subscribe({
            next: (response) => {
            this._organizations.set(response.data);
            this._pagination.set({
                currentPage: response.meta.current_page,
                lastPage: response.meta.last_page,
                perPage: response.meta.per_page,
                total: response.meta.total
            });
            this._isLoading.set(false);
            },
            error: (err) => {
            this._error.set(err.message || 'Failed to load organizations');
            this._isLoading.set(false);
            }
        });
    }

    loadOrganization(id: string): void {
        this._isLoading.set(true);
        this._error.set(null);
        this.api.get<ApiResponse<Organization>>(`organizations/${id}`)
        .subscribe({
            next: (response) => {
            this._selectedOrganization.set(response.data);
            this._isLoading.set(false);
            },
            error: (err) => {
            this._error.set(err.message || 'Failed to load organization');
            this._isLoading.set(false);
            }
        });
    }

    createOrganization(data: CreateOrganizationDto): Promise<Organization> {
        this._isLoading.set(true);
        this._error.set(null);
        return new Promise((resolve, reject) => {
        this.api.post<ApiResponse<Organization>>('organizations', data)
            .subscribe({
            next: (response) => {
                // Agregar al inicio de la lista
                this._organizations.update(orgs => [response.data, ...orgs]);
                this._isLoading.set(false);
                resolve(response.data);
            },
            error: (err) => {
                this._error.set(err.error?.message || 'Failed to create');
                this._isLoading.set(false);
                reject(err);
            }
            });
        });
    }

    updateOrganization(id: string, data: Partial<CreateOrganizationDto>): Promise<Organization> {
        this._isLoading.set(true);
        this._error.set(null);
        return new Promise((resolve, reject) => {
        this.api.put<ApiResponse<Organization>>(`organizations/${id}`, data)
            .subscribe({
            next: (response) => {
                // Actualizar en la lista
                this._organizations.update(orgs => 
                orgs.map(org => org.id === id ? response.data : org)
                );
                // Actualizar seleccionado si es el mismo
                if (this._selectedOrganization()?.id === id) {
                this._selectedOrganization.set(response.data);
                }
                this._isLoading.set(false);
                resolve(response.data);
            },
            error: (err) => {
                this._error.set(err.error?.message || 'Failed to update');
                this._isLoading.set(false);
                reject(err);
            }
            });
        });
    }

    deleteOrganization(id: string): Promise<void> {
        this._isLoading.set(true);
        return new Promise((resolve, reject) => {
        this.api.delete(`organizations/${id}`)
            .subscribe({
            next: () => {
                // Remover de la lista
                this._organizations.update(orgs => 
                orgs.filter(org => org.id !== id)
                );
                // Limpiar seleccionado si es el mismo
                if (this._selectedOrganization()?.id === id) {
                this._selectedOrganization.set(null);
                }
                this._isLoading.set(false);
                resolve();
            },
            error: (err) => {
                this._error.set(err.error?.message || 'Failed to delete');
                this._isLoading.set(false);
                reject(err);
            }
            });
        });
    }
    
    // Helpers
    clearSelected(): void {
        this._selectedOrganization.set(null);
    }
    clearError(): void {
        this._error.set(null);
    }
}
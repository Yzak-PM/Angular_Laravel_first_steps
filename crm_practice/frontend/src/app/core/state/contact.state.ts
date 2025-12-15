import { Injectable, inject, signal, computed } from '@angular/core';
import { ApiService, PaginatedResponse, ApiResponse } from '../services/api.service';
import { Contact, ContactFilters } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactState {
    private api = inject(ApiService);

    private _contacts = signal<Contact[]>([]);
    private _selectedContact = signal<Contact | null>(null);
    private _isLoading = signal<boolean>(false);
    private _error = signal<string | null>(null);
    private _pagination = signal({
        currentPage: 1,
        lastPage: 1,
        perPage: 15,
        total: 0
    });

    //& Public signals (solo lectura para componentes)
    readonly contacts = this._contacts.asReadonly();
    readonly selectedContact = this._selectedContact.asReadonly();
    readonly isLoading = this._isLoading.asReadonly();
    readonly error = this._error.asReadonly();
    readonly pagination = this._pagination.asReadonly();

    //& Computed signals (valores derivados)
    readonly hasContacts = computed(() => this._contacts().length > 0);
    readonly totalCount = computed(() => this._pagination().total);
    // readonly parentOrganizations = computed(() => 
    //     this._contacts().filter(org => org.id === ))

    //& Actions (metodos que modifican el estado)
    loadContacts(filters: ContactFilters = {}): void {
        this._isLoading.set(true);
        this._error.set(null);
        this.api.get<PaginatedResponse<Contact>>('contacts', filters)
        .subscribe({
            next: (response) => {
                this._contacts.set(response.data);
                this._pagination.set({
                    currentPage: response.meta.current_page,
                    lastPage: response.meta.last_page,
                    perPage: response.meta.per_page,
                    total: response.meta.total
                });
                this._isLoading.set(false);
            },
            error: (err) => {
                this._error.set(err.message || 'Failed to load contacts');
                this._isLoading.set(false);
            }
        });
    }
}
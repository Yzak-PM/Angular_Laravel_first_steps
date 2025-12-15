export interface Contact {
    id: string;
    organization_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    title: string;
    department: string | null;
    is_primary: string;
    status: 'active' | 'inactive';
    notes: string | null;
    created_at: string;
    updated_at: string;
}

export interface ContactFilters {
    search?: string;
    status?: string;
    per_page?: string;
    page?: number;
}

export interface CreateContactDto {
    organization_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    title: string;
    department: string | null;
    is_primary: string;
    status: 'active' | 'inactive';
    notes: string | null;
}
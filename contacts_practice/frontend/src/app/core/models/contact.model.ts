export interface Contact {
    id: string;
    name: string;
    mobile: string;
    email: string;
    company: string;
    created_at: string;
    updated_at: string;
}

export interface ContactFilters {
    search?: string;
    per_page?: string;
    page?: number;
}

export interface CreateContactDto {
    name: string;
    mobile: string;
    email: string;
    company: string;
    created_at: string;
}
export interface Organization {
    id: string;
    parent_id: string | null;
    name: string;
    type: 'parent' | 'subsidiary' | 'branch';
    email: string | null;
    phone: string | null;
    website: string | null;
    address: string | null;
    status: 'active' | 'inactive';
    path: string;
    created_at: string;
    updated_at: string;

    // Relaciones
    parent?: Organization;
    children?: Organization[];
}

export interface OrganizationFilters {
    search?: string;
    type?: string;
    status?: string;
    per_page?: number;
    page?: number;
}

export interface CreateOrganizationDto {
    parent_id?: string;
    name: string;
    type: 'parent' | 'subsidiary' | 'branch';
    email?: string;
    phone?: string;
    website?: string;
    address?: string;
    status?: 'active' | 'inactive';
}
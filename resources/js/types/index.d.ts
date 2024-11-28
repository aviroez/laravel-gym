export interface Role {
    admin: 'Admin',
    operator: 'Operator',
    member: 'Member',
    guest: 'Guest',
};

export interface Gender {
    male: 'Male',
    female: 'Female',
};

export interface Status {
    active: 'Active',
    inactive: 'Inactive',
    expired: 'Expired',
};

export interface InvoiceType {
    unpaid: 'Unpaid',
    partially_paid: 'Partially Paid',
    paid: 'Paid',
};

export interface PaymentMethod {
    cash: 'Cash',
    cashless: 'Cashless',
};

export interface PlanType {
    register: 'Register',
    subscription: 'Subscription',
};

export interface PlanUnit {
    day: 'Day',
    week: 'Week',
    month: 'Month',
    year: 'Year',
};

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    email_verified_at?: string;
    phone?: string;
    birth_date?: string;
    role?: 'admin' | 'operator' | 'member' | 'guest';
    gender?: 'male' | 'female';
}

export interface Plan {
    id: number;
    name: string;
    description?: string;
    duration?: number;
    unit?: 'day' | 'week' | 'month' | 'year';
    price?: number;
    status?: 'active' | 'inactive';
    type?: 'register' | 'subscription';
}

export interface Subscription {
    id: number;
    user_id: number;
    plan_id: number;
    title: string;
    date_from?: Date;
    date_to?: Date;
    status?:  'active' | 'inactive' | 'expired' | null;
    type?: 'register' | 'subscription' | null;
    quantity?: number | 0;
    price?: number | 0;
    user?: User;
    plan?: Plan;
    invoice_items?: [InvoiceItem];
}

export interface Invoice {
    id: number;
    user_id: number;
    number: string;
    date?: Date;
    due_date?: Date;
    total?: number;
    status?: 'unpaid' | 'partially_paid' | 'paid' | null;
    note?: string;
    user?: User;
    items: [InvoiceItem]
}

export interface InvoiceItem {
    id: number;
    invoice_id: number;
    subscription_id: number;
    quantity?: number;
    price?: number;
    description: string;
    status?: 'unpaid' | 'partially_paid' | 'paid' | null;
    invoice?: Invoice;
    subscription?: Subscription;
}

export interface Payment {
    id: number;
    user_id: number;
    invoice_id: number;
    number: string;
    date?: Date;
    amount?: number;
    paid?: number;
    method?: 'cash' | 'cashless' | null;
    note?: string;
    user?: User;
    invoice?: Invoice;
}

export interface Setting {
    key: string
    value: string
    type: string
}

export interface Filter {
    search?: string
    role?: string
    gender?: string
    type?: string
    unit?: string
    status?: string
    invoice_id?: string
    user_id?: string
}

export interface PaginationLink {
    active: boolean
    label: string
    url: string
}

export type FlashMessages = {
    success?: string;
    failed?: string;
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    settings: Setting[],
    translations: [],
    filters: Filter[],
    flash: FlashMessages;
};

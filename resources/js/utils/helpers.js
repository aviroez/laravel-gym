export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount).replace(/,00$/, '');
};

export const formatDate = (date) => {
    if (!date) {
        return new Date().toLocaleDateString('en-CA');
    } else {
        try {
            return date.toLocaleDateString('en-CA');
        } catch (error) {
            return new Date().toLocaleDateString('en-CA');            
        }
    }
};

export const formatDateString = (date) => {
    const options = {
        year: 'numeric', // Full year
        month: 'short',   // Full month name
        day: 'numeric',  // Numeric day
    }
    if (!date) {
        return new Date().toLocaleDateString('id-ID', options);
    } else {
        try {
            return date.toLocaleDateString('id-ID', options);
        } catch (error) {
            return new Date().toLocaleDateString('id-ID', options);            
        }
    }
};

export const formatDateTime = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount).replace(/,00$/, '');
};
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
}

export function toBoolean(str: string): boolean {
    return str.toLowerCase() === 'true';
}
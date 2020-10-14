export const decimal_to_gray = (num: number): string => {
    return (num ^ (num >>> 1)).toString(2);
};

export const binary_to_decimal = (num: string): number => {
    return parseInt(num, 2);
};

export const decimal_to_binary = (num: number): string => {
    return (num >>> 0).toString(2);
};

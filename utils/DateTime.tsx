import { format, parseISO } from "date-fns";

interface DateProps {
    date?: string;
}

export function Date({ date = "" }: DateProps): string {
    if (!date) return "Invalid date";
    const parsedDate = parseISO(date);
    if (isNaN(parsedDate.getTime())) return "Invalid date";
    return format(parsedDate, "dd/MM/yyyy");
}

export function DateTime({ date = "" }: DateProps): string {
    if (!date) return "Invalid date";
    const parsedDate = parseISO(date);
    if (isNaN(parsedDate.getTime())) return "Invalid date";
    return format(parsedDate, "dd/MM/yyyy HH:mm");
}
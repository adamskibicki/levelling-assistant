export function toReadableDate(date: Date): string {
    return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "medium" }).format(new Date(date));
}
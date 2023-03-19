import { DateTime } from "luxon";

export default function parseDate (dateStr: string) {
    const date = DateTime.fromISO(dateStr);
    if (date.isValid) {
        return date;
    }
    return null
}
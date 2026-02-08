import { format, isValid } from "date-fns";
import { id } from "date-fns/locale";

export function formatDate(
	date: Date | string,
	formatString: string = "EEEE, dd MMMM yyyy",
): string {
	if (typeof date === "string" && !isValid(date)) {
		return "";
	}
	return format(new Date(date), formatString, { locale: id });
}

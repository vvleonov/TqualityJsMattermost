export default class StringUtil {
    static matchByRegex(text, regex) {
        const match = text.match(regex);

        if (match) {
            return match[0];
        } else {
            throw new Error(`${text} не совпал с паттерном ${regex}`);
        }
    }
}
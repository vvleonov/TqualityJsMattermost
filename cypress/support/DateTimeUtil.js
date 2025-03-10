export default class DateTimeUtil {
    static getCurrentDate() {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        return currentDate;
    }
}
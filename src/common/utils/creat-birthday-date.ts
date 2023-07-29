export const createBirthdayDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const age = calculateAge(date);

    return `${day} ${month} ${year} (${age})`;
}

export const calculateAge =(date: Date): number => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
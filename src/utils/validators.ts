export const checkRequired = (str: string) => {
    if (str.length !== 0) return true
    else return false
}
export const checkLength = (str: string, length: number) => {
    if (str.length > length) return true
    else return false
}
export const checkEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
export const checkMatch = (str1: string, str2: string) => {
    if (str1 === str2) return true
    else return false
}
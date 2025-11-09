import Cookies from "js-cookie";

export function useGetToken() {
    const token = Cookies.get("token");
    return token;
}

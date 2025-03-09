import { setUser, setUserLoggedOut } from "@/store/userSlice";
import { BACKEND_URL } from "./vars";
import { store } from "@/store/store";

type JSONValue = string | number | boolean | JSONObject | null; // | JSONArray
interface JSONObject {
	[key: string]: JSONValue;
}

export function extractStrings(obj: JSONObject): string[] {
	const result: string[] = [];

	function traverse(value: JSONValue): void {
		if (typeof value === "string") {
			result.push(value);
		} else if (typeof value === "object" && value !== null) {
			if (Array.isArray(value)) {
				for (const item of value) {
					traverse(item);
				}
			} else {
				for (const key in value) {
					traverse(value[key]);
				}
			}
		}
	}

	traverse(obj);
	return result;
}

export async function logInWithTokenCookie() {
	// make login api call

	const response = await fetch(BACKEND_URL + "/api/auth/user/", {
        method: "GET",
        credentials: 'include',
    });
	const data = await response.json();

    if (response.ok) {
        const user = {
			loggedIn: true,
            username: data["username"],
            email: data["email"],
            firstName: data["first_name"],
            lastName: data["last_name"],
        };
    
        // set user data in document store
        store.dispatch(setUser(user));
    } else {
		store.dispatch(setUserLoggedOut());
	}
}

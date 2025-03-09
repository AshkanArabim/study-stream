import { setUser, setUserLoggedOut } from "@/store/userSlice";
import { BACKEND_URL } from "./vars";
import { store } from "@/store/store";

type JSONValue = string | number | boolean | JSONObject | null; // | JSONArray
interface JSONObject {
	[key: string]: JSONValue;
}

interface UserJSON {
	username: string;
	email: string;
	first_name: string;
	last_name: string;
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

async function updateUserSliceWithReponse(response: Response, data: UserJSON) {
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

export async function checkUserTokens() {
	// make login api call

	const response = await fetch(BACKEND_URL + "/api/auth/user/", {
		method: "GET",
		// FIXME: remove vv in prod (cookies passed by default on same domain)
		credentials: "include",
	});
	const data = await response.json();

	updateUserSliceWithReponse(response, data);
}

export async function logIn(username: string, password: string) {
	// make login request
	const response = await fetch(BACKEND_URL + "/api/auth/login", {
		method: "POST",
		// FIXME: remove vv in prod (cookies passed by default on same domain)
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: username,
			password: password,
		}),
	});

	const data = await response.json();

	// update redux if successful - enables auto-redirect
	updateUserSliceWithReponse(response, data);

	return response;
}

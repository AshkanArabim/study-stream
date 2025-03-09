import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	loggedIn: boolean | undefined;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
}

const initialState: User = {
	// false if not logged in, true if logged in, undefined if we gotta check
	loggedIn: undefined,
	username: "",
	email: "",
	firstName: "",
	lastName: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			const { loggedIn, username, email, firstName, lastName } = action.payload;
			state.loggedIn = loggedIn;
			state.username = username;
			state.email = email;
			state.firstName = firstName;
			state.lastName = lastName;
		},
		setUserLoggedOut: (state) => {
			Object.assign(state, initialState, { loggedIn: false });
		},
		clearUser: () => initialState,
	},
});

export const { setUser, setUserLoggedOut, clearUser } = userSlice.actions;
export default userSlice.reducer;

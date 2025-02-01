import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	username: string;
	email: string;
	firstName: string;
	lastName: string;
}

const initialState: User = {
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
			const { username, email, firstName, lastName } = action.payload;
			state.username = username;
			state.email = email;
			state.firstName = firstName;
			state.lastName = lastName;
		},
		clearUser: () => initialState,
	},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

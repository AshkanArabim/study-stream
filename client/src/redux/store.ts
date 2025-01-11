import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Note {
    noteId: number,
    userId: number,
    title: string,
    crn: number,
    tally: number,
    class_date_and_time: Date,
    image_url: string,
    vote_status: string
}

export interface User {
    username: string,
    userId: number
}

export interface State {
    // Define your state shape here
    token: string,
    filters: {
        crn: number | null,
        date: Date | null
    },
    currentNotes: Note[],
    currentUser: User | null
}

const initialState: State = {
    token: "",
    filters: {
        crn: null,
        date: null
    },
    currentNotes: [],
    currentUser: null
};

// User state and reducer
interface UserState {
    currentUser: User | null
}

const initialUserState: UserState = {
    currentUser: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<User>) {
            state.currentUser = action.payload
        },
        clearCurrentUser(state) {
            state.currentUser = null
        }
    }
})

// State reducers
const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload
        },
        setFilters(state, action: PayloadAction<{ crn: number | null, date: Date | null }>) {
            state.filters = action.payload
        },
        setCurrentNotes(state, action: PayloadAction<Note[]>) {
            state.currentNotes = action.payload
        },
        setCurrentUser(state, action: PayloadAction<User | null>) {
            state.currentUser = action.payload
        }
    }
})

export const { addPerson, removePerson, updatePerson } = personSlice.actions
export const { setCurrentUser, clearCurrentUser } = userSlice.actions
export const { setToken, setFilters, setCurrentNotes, setCurrentUser: setAppCurrentUser } = stateSlice.actions

export const personReducer = personSlice.reducer
export const userReducer = userSlice.reducer
export const stateReducer = stateSlice.reducer

export const store=configureStore({
	reducer: {
        
		// add more for other slices!
	}
})

// slap TS return type on useDispatch
export const useAppDispatch: () => typeof store.dispatch=useDispatch

// slap type on top of useSelector
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

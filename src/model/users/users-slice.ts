import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';
import {createDate} from "../../common/utils/createDate";
import {UserType2} from "../../components/form/form";

const initialState: InitialStateType = {
    users: [],
};

const slice = createSlice({
    name: "users",
    initialState:  initialState,
    reducers: {
        addUser(state, action: PayloadAction<{ user: UserType }>) {
            const id = uuid()
            const date = new Date().toISOString()
            const user: UserDomainType = {
                name: action.payload.user.name,
                date: action.payload.user.date,
                updated: date,
                created: date,
                key: state.users.length + 1,
                id
            }
            state.users.push(user)
        },
        deleteUser(state, action: PayloadAction<{ id: string}>) {
            const index = state.users.findIndex((user) => user.id === action.payload.id);
            if (index > -1) state.users.splice(index, 1);
        },
        changeUser(state, action: PayloadAction<{ id: string, user: UserType }>) {
            const index = state.users.findIndex((user) => user.id === action.payload.id);
             if (index > -1) state.users[index] = {...state.users[index], ...action.payload.user, updated: new Date().toISOString()}
        },
    },
});
export const usersReducer = slice.reducer;
export const usersActions = slice.actions;
export type InitialStateType = {
    users: UserDomainType[]
};

export type UserDomainType =  {
    id: string
    key: number
    created: string
    updated: string
} & UserType;

export type UserType = {
     date: string
    name: string
};
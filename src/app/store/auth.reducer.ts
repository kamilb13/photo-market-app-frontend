import {createReducer, on} from '@ngrx/store';
import {setUser} from './auth.actions';
import {LoggedUser} from '../models/loggedUser.model';

export interface AuthState {
  loggedUser: LoggedUser | null;
}

export const initialAuthState: AuthState = {
  loggedUser: null,
}

export const authReducer = createReducer(
  initialAuthState,
  on(setUser, (state, {loggedUser}) => ({...state, loggedUser}))
)

import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectUser = createSelector(selectAuthState, (state) => state.loggedUser);

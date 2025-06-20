import { createAction, props } from '@ngrx/store';
import {LoggedUser} from '../models/loggedUser.model';

export const setUser = createAction('[Auth] Set User', props<{ loggedUser: LoggedUser }>());

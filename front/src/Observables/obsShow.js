import { BehaviorSubject } from 'rxjs';

export const show$ = new BehaviorSubject(false);
export const showS$ = new BehaviorSubject(false);

export const lstMsg$ = new BehaviorSubject([]);

export const showFgt$ = new BehaviorSubject(false);

export const showPass$ = new BehaviorSubject(false);

export const showPassObj$ = new BehaviorSubject({});
import { ActionContext } from 'vuex';
export declare function connexAction<T>(action: <S, R>(context: ActionContext<S, R>, payload: any) => T): <S, R>(context: ActionContext<S, R>, payload: any) => T;

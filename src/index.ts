import { useMemo } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

/**
 * Hook factory, which creates a `useActions` hook bound to dispatch.
 *
 * @param actions object with actions to bind to dispatch.
 *
 * @example
 * // actions.js
 * import { bindActionCreators } from 'react-redux'
 *
 * export const doSomething = e => ({
 *   type: 'sometype',
 *   payload: e.target.value,
 * })
 *
 * export const useActions = createActionsHook({ doSomething })
 *
 * // component.js
 * import React from 'react'
 * import { useSelector } from 'react-redux'
 * import { useActions } from './actions'
 *
 * export const MyComponent = ({ id, text }) => {
 *   const action = useActions()
 *   return (
 *     <button value={id} onClick={action.doSomething}>
 *       {text}
 *     </button>
 *   )
 * }
 */
export function createActionsHook<T>(actions: T) {
  return function useActions(deps: any[] = []): T {
    const dispatch = useDispatch();
    return useMemo(
      () => {
        if (Array.isArray(actions)) {
          return actions.map((a) => bindActionCreators(a, dispatch));
        }
        return bindActionCreators(actions as any, dispatch);
      },
      deps ? [dispatch, ...deps] : [dispatch]
    ) as T;
  };
}

/**
 * useActions hook bound to the context's dispatch
 *
 * @param actions object with actions to bind to dispatch.
 * @param deps optional array of dependencies.
 */
export function useActions<T>(actions: T, deps: any[] = []): T {
  return createActionsHook(actions)(deps);
}

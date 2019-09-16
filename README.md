# react-redux-actions-hook

## `useActions(actions, dependencies)`

Hook to use actions bound to dispatch.

```js
const actions : Object = useActions(actions: Object, dependencies : Array);
```

#### Example

```jsx
import { useActions } from 'react-redux-actions-hook'
import * as rawActions from './actions'

export default const MyComponent = () => {
  const actions = useActions(rawActions, []);
  return (
    <button onClick={actions.goHome}>Home</button>
  )
}
```

## `createActionsHook(actions) => Function useActions(dependencies)`

Factory to create useActions methods for use in action creator modules.

```js
const useActions : Function = createActionsHook(actions : Object);
```

This hook factory can be used in with your action creators in order to expose a `useActions()` hook that can be used in your components.

#### Example

```jsx
// actions.js
import { createActionsHook } from 'react-redux-actions-hook'

export const doSomething = e => ({  
  type: 'admin-button-action',
  payload: e.target.value,
})

export const useActions = createActionsHook({ doSomething })

// AdminButton.jsx
import { useSelector } from 'react-redux'
import { useActions } from './actions'
 
export const AdminButton = ({ key, text }) => {
  const user = useSelector(({ user }) => user)
  const action = useActions([ key, user ])
  if (!user.isAdmin) return null
  return (
    <button
      class="admin-button"
      onClick={action.doSomething}
      value={id}
    >
      {text}
    </button>
  )
}
```

When passing an array of dependencies to `useActions` the bound actions are memoized.

## License

MIT License
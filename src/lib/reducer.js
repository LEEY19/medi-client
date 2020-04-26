export const matchWith = (
  handlers,
  defaultHandler = (state, action) => state
) => (state, action) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](state, action)
    : defaultHandler(state, action);

export const combine = reducers => (state, action) =>
  Object.keys(reducers).reduce(
    (state, key) => state.update(key, slice => reducers[key](slice, action)),
    state
  );

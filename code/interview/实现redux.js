export default function createStore(reducer) {
  let currentState = null;
  let currentListeners = [];

  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.forEach((fn) => fn());
  }

  function getState() {
    return currentState;
  }

  function subscribe(listen) {
    currentListeners.push(listen);

    return function () {
      const index = currentListeners.indexOf(listen);
      currentListeners.splice(index, 1);
    };
  }

  dispatch({ type: "REDUX/XXX" });

  return {
    dispatch,
    getState,
    subscribe,
  };
}

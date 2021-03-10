
// //it's not very good if this variable is global, and we can accidentally overwrite
// let state;

// // We can solve this by wrapping our state in a function
// function createStore(){
//   let state;
// }

// to keep the code generic to any application, pass in the reducer so the store has access
function createStore(reducer) {
  let state;
  // state is now accessible to dispatch

  function dispatch(action) {
    state = reducer(state, action);
    render();
  }

  function getState() {
    return state;
  }

  return { dispatch, getState }
} 

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };

    default:
      return state;
  }
};

// // MOVED into createStore to have access to state
// // ~ however ~ render then loses state and throws an error
// function dispatch(action){
//   state = reducer(state, action);
//   render();
// };

function render() {
  let container = document.getElementById('container');
  // container.textContent = state.count; // no longer have access to state
  container.textContent = store.getState().count
};

// dispatch({ type: '@@INIT' }) // now located within store

let store = createStore(reducer); //pass in the reducer to have access to know what to do with state
store.dispatch({ type: '@@INIT' });
let button = document.getElementById('button');

button.addEventListener('click', () => {
  // dispatch({ type: 'INCREASE_COUNT' }); // need to access store
    store.dispatch({ type: 'INCREASE_COUNT' });
}) 
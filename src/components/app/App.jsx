import React, { useReducer } from 'react';

// const useRecord = (init) => {
//   const [before, setBefore] = useState([]);
//   const [current, setCurrent] = useState(init);
//   const [after, setAfter] = useState([]);

//   const undo = () => {
//     setAfter((after) => [current, ...after]);
//     setCurrent(before[before.length - 1]);
//     setBefore((before) => before.slice(0, -1));
//   };

//   const redo = () => {
//     setBefore((before) => [...before, current]);
//     setCurrent(after[0]);
//     setAfter((after) => after.slice(1));
//   };

//   const record = (val) => {
//     setBefore((before) => [...before, current]);
//     setCurrent(val);
//   };

//   return {
//     undo,
//     record,
//     redo,
//     current,
//   };
// };

const intialValue = {
  before: [],
  current: 'FF0000',
  after: [],
};

const reducer = (state, action) => {
  const { before, current, after } = state;

  switch (action.type) {
    case 'undo':
      return {
        after: [current, ...after],
        current: before[before.length - 1],
        before: before.slice(0, -1),
      };
    case 'redo':
      return {
        before: [...before, current],
        current: after[0],
        after: after.slice(0, -1),
      };
    case 'record':
      return {
        ...state,
        before: [...before, current],
        current: action.payload,
      };
  }
};

function App() {
  // const { current, undo, redo, record } = useRecord('#FF0000');

  const [state, dispatch] = useReducer(reducer, intialValue);

  return (
    <>
      <button
        aria-label="undo-button"
        onClick={() => dispatch({ type: 'undo' })}
      >
        undo
      </button>
      <button
        aria-label="redo-button"
        onClick={() => dispatch({ type: 'undo' })}
      >
        redo
      </button>
      <input
        aria-label="color-picker"
        type="color"
        value={state.current}
        onChange={({ target }) =>
          dispatch({ type: 'record', payload: target.value })
        }
      />
      <div
        aria-label="display"
        style={{
          backgroundColor: state.current,
          width: '10rem',
          height: '10rem',
        }}
      ></div>
    </>
  );
}

export default App;

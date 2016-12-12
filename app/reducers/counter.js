import * as types from '../actions/actionTypes';

const initialState = {
  count: 0
};

export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case types.INCREMENT:
		var newState = {
			...state,
			count: state.count + 1
		};
		fetch("http://localhost:3000/counters", {
		  method: "POST",
		  body: 'counter=' + newState.count
		}).then(function(res) {
		  if (res.ok) {
		    alert("Perfect! Your settings are saved.");
		  } else if (res.status == 401) {
		    alert("Oops! You are not authorized.");
		  }
		});
		return newState;
    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}

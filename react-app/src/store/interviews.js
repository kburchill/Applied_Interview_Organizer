const LOAD = "interviews/LOAD";
const ADD = "interviews/ADD";
const REMOVE = "interviews/REMOVE";

const load = interviews => ({
  type: LOAD,
  payload: interviews
})

const add = interview => ({
  type: ADD,
  payload: interview
})

const remove = interview => ({
  type: REMOVE,
  payload: interview
})


export const get_interviews = () => async (dispatch) => {
  const response = await fetch('/api/interviews/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log("outside fetch")
  if (response.ok) {
    const interviews = await response.json();
    console.log(interviews)
    dispatch(load(interviews))
    return interviews;
  }

}

const initialState = {}

const interviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      state.interviews = action.payload['interviews']
      return state
    default:
      return state
  }
}

export default interviewReducer;

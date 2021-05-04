const LOAD = "interviews/LOAD";
const ADD = "interviews/ADD";
const REMOVE = "interviews/REMOVE";
const EDIT = 'interviews/EDIT';


const load = interviews => ({
  type: LOAD,
  payload: interviews
})

const add = interview => ({
  type: ADD,
  payload: interview
})

const edit = interview => ({
  type: EDIT,
  payload: interview

})

const remove = interview => ({
  type: REMOVE,
  payload: interview
})


//Get all interviews
export const get_interviews = () => async (dispatch) => {
  const response = await fetch('/api/interviews/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const interviews = await response.json();
    dispatch(load(interviews))
    return interviews;
  }

}

//Get all interviews associated with application
export const get_application_interviews = (application_id) => async (dispatch) => {
  const response = await fetch(`/api/applications/${application_id}/interviews`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const interviews = await response.json();
    dispatch(load(interviews))
    return interviews;
  }
}

//Get all interviews associated with company
export const get_company_interviews = (company_id) => async (dispatch) => {
  const response = await fetch(`/api/companies/${company_id}/interviews`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const interviews = await response.json();
    dispatch(load(interviews))
    return interviews;
  }
}

// Create an interview
export const create_interview = (info) => async (dispatch) => {
  const response = await fetch('/api/interview/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      info
    })
  });

  if (response.ok) {
    const interview = await response.json();
    dispatch(add(interview))
    return interview;
  }
}

// Update an interview
export const update_interview = (info) => async (dispatch) => {
  const interview_id = info.interview_id
  const response = await fetch(`/api/interview/${interview_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "sent_out": info.sent_out,
      "response": info.response,
      "response_date": info.response_date,
      "interview": info.interview,
      "company_id": info.company_id,
      "user_id": info.user_id
    })
  });

  if (response.ok) {
    const application = await response.json();
    dispatch(edit(application))
    return application;
  }
}

//Delete an interview
export const delete_interview = (interview_id) => async (dispatch) => {

  const response = await fetch(`/api/interviews/${interview_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const interview = await response.json();
    dispatch(remove(interview))
    return interview;
  }
}

const initialState = {}

const interviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      state.interviews = action.payload['interviews']
      return state
    case ADD:
      return state
    case EDIT:
      return state
    case REMOVE:
      return state
    default:
      return state
  }
}

export default interviewReducer;

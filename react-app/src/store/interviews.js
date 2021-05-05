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
  console.log("INSIDE FETCH STORE", info)
  const response = await fetch('/api/interviews/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'company_id': info.company_id,
      'user_id': info.user_id,
      'date': info.date,
      'contact_name': info.contact_name,
      'completed': info.completed,
      'company_id': info.company_id,
      'user_id': info.user_id,
      'interview_type': info.interview_type
    })
  });

  if (response.ok) {
    const interview = await response.json();
    console.log(interview)
    dispatch(add(interview))
    return interview;
  }
}

// Update an interview
export const update_interview = (info) => async (dispatch) => {
  const interview_id = Object.keys(info)[0]
  const response = await fetch(`/api/interviews/${interview_id}`, {
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
    await response.json();
    dispatch(edit(info))
    return true;
  }
  return false;
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
    await response.json();
    dispatch(remove(interview_id))
    return true;
  }
  return false;
}

const initialState = {}

const interviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      state = action.payload
      return state
    case ADD:
      const new_interview = action.payload.interview
      state[new_interview[0]] = new_interview[1]
    case EDIT:
      const interview_id = Object.keys(action.payload)[0]
      const interview_info = Object.values(action.payload)[0]
      state[interview_id] = interview_info;
    case REMOVE:
      const key = action.payload
      delete state[key]
    default:
      return state
  }
}

export default interviewReducer;

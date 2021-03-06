const LOAD = "interviews/LOAD";
const ADD = "interviews/ADD";
const REMOVE = "interviews/REMOVE";
const EDIT = 'interviews/EDIT';
const SELECT = 'interviews/SELECT'
const REMOVE_SELECTED = 'interviews/REMOVE_SELECTED';

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

const selected = interview => ({
  type: SELECT,
  payload: interview
})

const remove_selected = () => ({
  type: REMOVE_SELECTED
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

//Fetch all interviews associated with company
export const get_company_interviews = (company_id) => async (dispatch) => {
  const response = await fetch(`/api/companies/${company_id}/interviews`);
  if (response.ok) {
    const interviews = await response.json();
    dispatch(load(interviews))
    return interviews;
  }
}

// Create an interview
export const create_interview = (info) => async (dispatch) => {
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
      'interview_type': info.interview_type
    })
  });

  if (response.ok) {
    const interview = await response.json();
    dispatch(add(interview))
    return interview;
  }
}

// Update an interview
export const update_interview = (interview_info) => async (dispatch) => {

  const interview_id = interview_info.interview_id
  const info = interview_info

  const response = await fetch(`/api/interviews/${interview_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "company_id": info.company_id,
      "user_id": info.user_id,
      "date": info.date,
      'contact_name': info.contact_name,
      'completed': info.completed,
      'interview_type': info.interview_type
    })
  });

  if (response.ok) {
    const interview = await response.json();
    dispatch(edit(interview_info))
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

export const selected_interview = (interview_id) => async (dispatch) => {
  dispatch(selected(interview_id))
}

export const remove_selected_interview = () => async (dispatch) => {
  dispatch(remove_selected())
}

const initialState = {}

const interviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      state['interviews'] = action.payload
      return state
    case ADD:
      const new_interview = action.payload.interview
      state['interviews'][new_interview[0]] = new_interview[1]
      return state
    case EDIT:
      const interview = action.payload
      console.log(interview)
      const interview_id = interview.interview_id;
      console.log(interview_id)
      state['interviews'][interview_id] = interview;
      return state
    case REMOVE:
      const key = action.payload
      delete state['interviews'][key]
      return state
    case SELECT:
      const selected_int_id = action.payload;
      const selected_int_info = state.interviews[selected_int_id]
      state['selected'] = [selected_int_id, selected_int_info]
      return state
    case REMOVE_SELECTED:
      delete state['selected']
      return state
    default:
      return state
  }
}

export default interviewReducer;

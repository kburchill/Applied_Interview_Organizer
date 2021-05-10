const LOAD = "applications/LOAD";
const ADD = "applications/ADD";
const REMOVE = "applications/REMOVE";
const EDIT = 'applications/EDIT';
const SELECT = 'applications/SELECT';
const REMOVE_SELECTED = 'applications/REMOVE_SELECTED';

const load = applications => ({
  type: LOAD,
  payload: applications
})

const add = application => ({
  type: ADD,
  payload: application
})

const edit = application => ({
  type: EDIT,
  payload: application
})

const remove = application => ({
  type: REMOVE,
  payload: application
})

const selected = application => ({
  type: SELECT,
  payload: application
})

const remove_selected = () => ({
  type: REMOVE_SELECTED
})


// Get all applications
export const get_applications = () => async (dispatch) => {
  const response = await fetch('/api/applications/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const applications = await response.json();
    dispatch(load(applications))
    return applications;
  }
}


// Create an application
export const create_application = (info) => async (dispatch) => {
  const response = await fetch('/api/applications/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "sent_out": info.sent_out,
      "response": info.response,
      "response_date": info.response_date,
      "interview": info.interview,
      "company_id": info.company_id,
      "user_id": info.user_id,
      "interview_id": info.interview_id
    })
  });
  if (response.ok) {
    const application = await response.json();
    dispatch(add(application))
    return true;
  }
}

// Update an applicaion
export const update_application = (info) => async (dispatch) => {
  const application_id = Object.keys(info)[0]
  const response = await fetch(`/api/applications/${application_id}`, {
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

//Delete an application
export const delete_application = (application_id) => async (dispatch) => {
  const response = await fetch(`/api/applications/${application_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    await response.json()
    dispatch(remove(application_id))
    return true;
  }
  return false;
}

//Set selected application
export const selected_application = (application_id) => async (dispatch) => {
  dispatch(selected(application_id))
}

export const remove_selected_application = () => async (dispatch) => {
  dispatch(remove_selected())
}

const initialState = {}

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      state['applications'] = action.payload
      return state
    case ADD:
      const new_app = action.payload.application
      state['applications'][new_app[0]] = new_app[1]
      return state
    case EDIT:
      const app_id = Object.keys(action.payload)[0]
      const app_info = Object.values(action.payload)[0]
      state['applications'][app_id] = app_info;
      return state
    case REMOVE:
      const key = action.payload
      delete state['applications'][key]
      return state
    case SELECT:
      const selected_app_id = action.payload;
      const selected_app_info = state.applications[selected_app_id]
      state['selected'] = [selected_app_id, selected_app_info]
      return state
    case REMOVE_SELECTED:
      delete state['selected']
      return state
    default:
      return state
  }
}

export default applicationReducer;

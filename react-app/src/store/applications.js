const LOAD = "applications/LOAD";
const ADD = "applications/ADD";
const REMOVE = "applications/REMOVE";
const EDIT = 'applications/EDIT';

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
      "user_id": info.user_id
    })
  });

  if (response.ok) {
    const application = await response.json();
    dispatch(add(application))
    return application;
  }
}

// Update an applicaion
export const update_application = (info) => async (dispatch) => {

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
    const application = await response.json();
    dispatch(edit(application))
    return application;
  }
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
    const application = await response.json();
    dispatch(remove(application))
    return application;
  }
}

const initialState = {}

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      state['applications'] = action.payload['applications']
      return state
    case ADD:
    //Add an application to a state
    case EDIT:
    //Edit an application in state
    case REMOVE:
    //Remove an application from state
    default:
      return state
  }
}

export default applicationReducer;

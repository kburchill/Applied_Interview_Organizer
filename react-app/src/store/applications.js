const LOAD = "applications/LOAD";
const ADD = "applications/ADD";
const REMOVE = "applications/REMOVE";

const load = applications => ({
  type: LOAD,
  payload: applications
})

const add = application => ({
  type: ADD,
  payload: application
})

const remove = application => ({
  type: REMOVE,
  payload: application
})


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

export const create_application = (info) => async (dispatch) => {
  console.log("WHAT DOES IT LOOK LIKE", info.response_date)
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

const initialState = {}

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      state['applications'] = action.payload['applications']
      return state
    case ADD:
    //What type of data is it in?
    default:
      return state
  }
}

export default applicationReducer;

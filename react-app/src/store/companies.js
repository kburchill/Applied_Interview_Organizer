const LOAD = "companies/LOAD";
const ADD = "companies/ADD";

const load = companies => ({
  type: LOAD,
  payload: companies
})

const add = company => ({
  type: ADD,
  payload: company
})


//Get all companies
export const get_companies = () => async (dispatch) => {
  const response = await fetch('/api/companies/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const companies = await response.json();
    dispatch(load(companies))
    return companies;
  }
}

// Create a company
export const create_company = (info) => async (dispatch) => {
  const response = await fetch('/api/companies/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: info.name,
      state: info.state,
      city: info.city,
      address_1: info.address_1,
      address_2: info.address_2,
      job_openings: info.job_openings
    })
  });

  if (response.ok) {
    const company = await response.json();
    dispatch(add(company))
    return true;
  }
  return false;
}

const initialState = {}

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      state = action.payload
      return state
    case ADD:
      const new_company = action.payload.company
      state[new_company[0]] = new_company[1]
    default:
      return state
  }
}

export default companyReducer;

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
      info
    })
  });

  if (response.ok) {
    const company = await response.json();
    dispatch(add(company))
    return company;
  }
}

const initialState = {}

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      state.companies = action.payload['companies']
      return state
    case ADD:
    default:
      return state
  }
}

export default companyReducer;

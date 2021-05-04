const LOAD = "companies/LOAD";
const ADD = "companies/ADD";
const REMOVE = "companies/REMOVE";

const load = companies => ({
  type: LOAD,
  payload: companies
})

const add = company => ({
  type: ADD,
  payload: company
})

const remove = company => ({
  type: REMOVE,
  payload: company
})


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

const initialState = {}

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      state.companies = action.payload['companies']
      return state
    default:
      return state
  }
}

export default companyReducer;

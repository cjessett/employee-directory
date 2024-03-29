const baseUrl = '/api/employees';

// actionTypes
const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
const FETCH_EMPLOYEES_ERROR = 'FETCH_EMPLOYEES_ERROR';
const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
const FETCH_EMPLOYEE = 'FETCH_EMPLOYEE';
const FETCH_EMPLOYEE_SUCCESS = 'FETCH_EMPLOYEE_SUCCESS';
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
const SET_PAGE = 'SET_PAGE';

// selectors
export const getVisibleEmployees = (employees, query) => {
  if (!query) return employees;
  const queryFilter = prop => employee => employee[prop].toLowerCase().startsWith(query.toLowerCase());
  const firstNameMatches = employees.filter(queryFilter('firstName'));
  const lastNameMatches = employees.filter(queryFilter('lastName'));
  return [...firstNameMatches, ...lastNameMatches].filter((v, i, s) => s.indexOf(v) === i);
}

export const findEmployeeById = (state, id) => {
  const employeeMatch = employee => employee.id === parseInt(id, 0);
  return state.employees.collection.find(employeeMatch) || {};
}

// actions
const startAction = (type, params) => ({ type, params });
const successAction = (type, data) => ({ type, payload: data });
// const errorAction = (type, error) => ({ type, payload: error, error: true });
export const setSearchValue = value => ({ type: 'SET_SEARCH_VALUE', payload: value });

export const getEmployees = (params = { page: 1 }) => async (dispatch, getState) => {
  const page = params.page || 1;
  const queryParams = new URLSearchParams(params);
  dispatch(startAction(FETCH_EMPLOYEES, params));
  const res = await fetch(`${baseUrl}?${queryParams}`);
  const { result, pageSize, pages } = await res.json();
  dispatch(successAction(FETCH_EMPLOYEES_SUCCESS, { result, pageSize, pages, page }));
};

export const getEmployee = id => async dispatch => {
  dispatch(startAction(FETCH_EMPLOYEE, id));
  const res = await fetch(`${baseUrl}/${id}`);
  const { result } = await res.json();
  dispatch(successAction(FETCH_EMPLOYEE_SUCCESS, { result }));
}

export const updatePage = page => (dispatch, getState) => {
  const { filters: { department, jobTitle, location } } = getState();
  dispatch(successAction(SET_PAGE, page));
  dispatch(getEmployees({ department, jobTitle, location, page }));
}

const initialState = {
  isLoading: false,
  hasFetched: false,
  error: null,
  collection: [],
  pageSize: 0,
  pages: 0,
  page: 1,
  searchValue: '',
};

// reducer
export default function(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_EMPLOYEES:
      return {
        ...state,
        isLoading: true,
        error: null,
        hasFetched: false,
      };
    case FETCH_EMPLOYEES_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
        hasFetched: true,
      };
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        collection: payload.result,
        pageSize: payload.pageSize,
        pages: payload.pages,
        page: payload.page,
        isLoading: false,
        hasFetched: true,
      };
    case FETCH_EMPLOYEE:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        collection: [payload.result],
        isLoading: false,
      }
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: payload,
      }
    case SET_PAGE:
      return {
        ...state,
        page: payload,
        hasFetched: false,
      }
    default:
      return state;
  }
}

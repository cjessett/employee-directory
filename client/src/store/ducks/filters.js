// actionTypes
const FETCH_DEPARTMENTS = 'FETCH_DEPARTMENTS';
const FETCH_TITLES = 'FETCH_TITLES';
const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
const FETCH_ERROR = 'FETCH_ERROR';
const FETCH_DEPARTMENTS_SUCCESS = 'FETCH_DEPARTMENTS_SUCCESS';
const FETCH_TITLES_SUCCESS = 'FETCH_TITLES_SUCCESS';
const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
const SET_DEPARTMENT = 'SET_DEPARTMENT';
const SET_JOB_TITLE = 'SET_JOB_TITLE';
const SET_LOCATION = 'SET_LOCATION';

// actions
const startAction = type => ({ type });
const successAction = (type, data) => ({ type, payload: data });
// const errorAction = (type, error) => ({ type, payload: error, error: true });

export const getDepartments = () => async(dispatch) => {
  dispatch(startAction(FETCH_DEPARTMENTS));
  const res = await fetch('/api/departments');
  const { result } = await res.json();
  dispatch(successAction(FETCH_DEPARTMENTS_SUCCESS, { result }));
};

export const getTitles = () => async (dispatch) => {
  dispatch(startAction(FETCH_TITLES));
  const res = await fetch('/api/titles');
  const { result } = await res.json();
  dispatch(successAction(FETCH_TITLES_SUCCESS, { result }));
};

export const getLocations = () => async (dispatch) => {
  dispatch(startAction(FETCH_LOCATIONS));
  const res = await fetch('/api/locations');
  const { result } = await res.json();
  dispatch(successAction(FETCH_LOCATIONS_SUCCESS, { result }));
};

export const setDepartment = department => successAction(SET_DEPARTMENT, department);
export const setJobTitle = title => successAction(SET_JOB_TITLE, title);
export const setLocation = location => successAction(SET_LOCATION, location);

const initialState = {
  isFetching: false,
  error: null,
  departments: [],
  locations: [],
  titles: [],
  department: '',
  jobTitle: '',
  location: '',
};

// reducer
export default function(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_DEPARTMENTS:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_TITLES:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_LOCATIONS:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_ERROR:
      return {
        ...state,
        error: payload,
        isFetching: false,
      };
    case FETCH_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        departments: payload.result,
        isFetching: false,
      };
    case FETCH_TITLES_SUCCESS:
      return {
        ...state,
        titles: payload.result,
        isFetching: false,
      };
    case FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: payload.result,
        isFetching: false,
      };
    case SET_DEPARTMENT:
      return {
        ...state,
        department: payload,
      }
    case SET_JOB_TITLE:
      return {
        ...state,
        jobTitle: payload,
      }
    case SET_LOCATION:
      return {
        ...state,
        location: payload,
      }
    default:
      return state;
  }
}

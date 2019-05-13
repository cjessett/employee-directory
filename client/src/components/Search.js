import React from 'react';
import { connect } from 'react-redux';

import { setSearchValue } from '../store/ducks/employees';

function Search({ value, setSearchValue }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => setSearchValue(e.target.value)}
      className="form-control"
      placeholder="Search for Employee"
    />
  )
}

function mapStateToProps(state) {
  const { searchValue } = state.employees;
  return { value: searchValue };
}

export default connect(mapStateToProps, { setSearchValue })(Search);
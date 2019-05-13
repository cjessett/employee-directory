import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getEmployees } from '../store/ducks/employees';
import { getDepartments, getTitles, getLocations, setDepartment, setJobTitle, setLocation } from '../store/ducks/filters';

import Filter from './Filter';

function FilterList(props) {
  const {
    departments,
    titles,
    locations,
    getEmployees,
    getDepartments,
    getTitles,
    getLocations,
    setDepartment,
    setJobTitle,
    setLocation,
    department,
    jobTitle,
    location,
  } = props;
  
  useEffect(() => {
    if (!departments.length) getDepartments();
    if (!titles.length) getTitles();
    if (!locations.length) getLocations();
  }, [getDepartments, getTitles, getLocations, departments, titles, locations])

  return (
    <div className="d-flex flex-sm-row flex-column">
      <Filter name="Department" options={departments} value={department} onSelect={e => setDepartment(e.target.value)} />
      <Filter name="Title" options={titles} value={jobTitle} onSelect={e => setJobTitle(e.target.value)} />
      <Filter name="Location" options={locations} value={location} onSelect={e => setLocation(e.target.value)} />
      <button onClick={() => getEmployees({ department, jobTitle, location, page: 1 })} className="btn btn-outline-secondary mb-3 m-1" type="button">Search</button>
    </div>
  );
}

function mapStateToProps(state) {
  const { departments, locations, titles, department, jobTitle, location } = state.filters;
  return { departments, locations, titles, department, jobTitle, location };
}

const actions = { getEmployees, getDepartments, getTitles, getLocations, setDepartment, setJobTitle, setLocation };

export default withRouter(connect(mapStateToProps, actions)(FilterList));
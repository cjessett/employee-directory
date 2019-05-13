import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactPlaceholder from 'react-placeholder';

import { getEmployees, getVisibleEmployees } from '../store/ducks/employees';

import EmployeeItem from './EmployeeListItem';

function EmployeeList({ employees, ready, getEmployees, pages }) {
  useEffect(() => {
    if (!employees.length) getEmployees();
  }, [getEmployees, employees])

  if (!employees.length && ready) return <h5 className="mx-auto mt-5">No Results</h5>;
  const custom = [...Array(10).keys()].map(i => {
    return (
      <ReactPlaceholder
        key={i}
        showLoadingAnimation
        ready={ready}
        className="list-group-item list-group-item-action"
        type="media"
        rows={2}
        children={[]}
        />
    );
  });
  const children = employees.map(employee => <EmployeeItem key={employee.id} {...employee} />)
  return (
    <ul className="list-group flex-grow-1">
      <ReactPlaceholder ready={ready} customPlaceholder={custom} children={children} />
    </ul>
  )
}

function mapStateToProps({ employees }) {
  const { isLoading, collection, searchValue, pages } = employees;
  const visibleEmployees = getVisibleEmployees(collection, searchValue);
  return { employees: visibleEmployees, ready: !isLoading, pages };
}

export default connect(mapStateToProps, { getEmployees })(EmployeeList);
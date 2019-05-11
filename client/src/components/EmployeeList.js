import React from 'react';
import ReactPlaceholder from 'react-placeholder';

export default function EmployeeList({ employees, ready }) {
  const custom = [...Array(10).keys()].map(i => {
    return (
      <ul className="list-group flex-grow-1">
        <ReactPlaceholder
          key={i}
          showLoadingAnimation
          ready={ready}
          className="list-group-item list-group-item-action"
          type="media"
          rows={2}
          children={[]}
          />
      </ul>
    );
  });
  if (!employees.length && ready) return <h5 className="mx-auto mt-5">No Results</h5>    
  return (
    <ul className="list-group flex-grow-1">
      <ReactPlaceholder ready={ready} customPlaceholder={custom} children={employees} />
    </ul>
  )
}
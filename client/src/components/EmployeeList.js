import React from 'react';
import ReactPlaceholder from 'react-placeholder';

export default function EmployeeList({ ready, employees }) {
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
  if (!employees.length) return <h5 className="mx-auto mt-5">No results</h5>;
  return (
    <ReactPlaceholder ready={ready} customPlaceholder={custom} children={employees} />
  )
}
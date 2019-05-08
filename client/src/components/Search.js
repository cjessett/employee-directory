import React from 'react';

export default function Search() {
  return (
    <div className="input-group mb-3">
      <input type="text" className="form-control" placeholder="Search for Employee" />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
      </div>
    </div>
  )
}
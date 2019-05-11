import React from 'react';

export default function Search({ value, onChange }) {
  return (
    <div className="input-group mb-3">
      <input type="text" value={value} onChange={onChange} className="form-control" placeholder="Search for Employee" />
    </div>
  )
}
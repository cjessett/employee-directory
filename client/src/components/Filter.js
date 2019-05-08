import React from 'react';

export default function Filter({ name, options }) {
  const opts = options.map((o, i) => <option key={i} value={o}>{o}</option>);
  return (
    <div className="input-group mb-3 m-1">
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">{name}</label>
      </div>
      <select className="custom-select" id={name}>
        <option defaultValue>Choose...</option>
        {opts}
      </select>
    </div>
  )
}

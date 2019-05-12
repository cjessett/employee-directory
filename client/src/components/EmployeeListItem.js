import React from 'react';
import { Link } from "react-router-dom";

export default function EmployeeItem({ id, firstName, lastName, jobTitle, avatar }) {
  return (
    <Link
      to={`/employees/${id}`}
      className="list-group-item list-group-item-action">
      <img style={{ width: '80px' }} className="img-thumbnail mr-2" src={avatar} alt="avatar" />
      <div style={{ display: 'inline-block' }} className="align-middle">
        <h5 style={{ display: 'block' }}>{firstName} {lastName}</h5>
        <span style={{ color: '#777' }}>{jobTitle}</span>
      </div>
    </Link>
  );
}
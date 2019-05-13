import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getEmployee, findEmployeeById } from '../store/ducks/employees';

function Employee(props) {
  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    jobTitle,
    avatar,
    match,
    employeeLocation,
    getEmployee,
  } = props;

  useEffect(() => {
    if (!id) getEmployee(match.params.id);
  },[getEmployee, match.params.id, id])

  return (
    <section className="d-flex justify-content-center mt-5">
      <ul className="list-group">
        <li className="list-group-item">
          <img style={{ width: '80px' }} className="img-thumbnail mr-2" src={avatar} alt="avatar" />
          <div style={{ display: 'inline-block' }} className="align-middle">
            <h5 style={{ display: 'block' }}>{firstName} {lastName}</h5>
            <span style={{ color: '#777' }}>{jobTitle}</span>
          </div>
        </li>
        <a href={`tel:${phone}`}><li className="list-group-item">{phone}</li></a>
        <a href={`mailto:${email}`}><li className="list-group-item">{email}</li></a>
        <li className="list-group-item">{employeeLocation}</li>
      </ul>
    </section>
  )
}

function mapStateToProps(state, { match: { params: { id } } }) {
  const employee = findEmployeeById(state, id);
  return { ...employee, employeeLocation: employee.location };
}

export default connect(mapStateToProps, { getEmployee })(Employee);


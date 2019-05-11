import React, { useState, useEffect }  from 'react';
import { getEmployee } from '../client';

export default function Employee({ match }) {
  const [employee, setEmployee] = useState({});
  
  useEffect(() => {
    async function fetchData() {
      const { result } = await getEmployee(match.params.id);
      
      setEmployee(result);
    }
    fetchData();
  }, [match.params.id]);
  
  const { firstName, lastName, email, phone, jobTitle, avatar, location } = employee;
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
        <li className="list-group-item">{location}</li>
      </ul>
    </section>
  )
}


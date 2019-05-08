import React, { Component } from 'react';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';

import getEmployees from './client';

function Search() {
  return (
    <div className="input-group mb-3">
      <input type="text" className="form-control" placeholder="Search for Employee" />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
      </div>
    </div>
  )
}

function Filter({ name, options }) {
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

function Employee({ firstName, lastName, jobTitle, avatar }) {
  return (
    <a
      href={`#${firstName}`}
      className="list-group-item list-group-item-action">
      <img style={{ width: '80px' }} className="img-thumbnail mr-2" src={avatar} alt="avatar" />
      <div style={{ display: 'inline-block' }} className="align-middle">
        <h5 style={{ display: 'block' }}>{firstName} {lastName}</h5>
        <span>{jobTitle}</span>
      </div>
    </a>
  );
}

function Placeholder({ ready, employees }) {
  const custom = [...Array(10).keys()].map(i => {
    return (
      <ReactPlaceholder showLoadingAnimation className="list-group-item list-group-item-action" type="media" rows={2} />
    );
  });
  return (
    <ReactPlaceholder ready={ready} customPlaceholder={custom}>
      {employees}
    </ReactPlaceholder>
  )
}

export default class App extends Component {
  constructor() {
    super()
    this.state = { employees: [], departments: [], locations: [], titles: [] };
  }

  async componentDidMount() {
    const { result } = await getEmployees();
    const departments = [...new Set(result.map(e => e.department))];
    const locations = [...new Set(result.map(e => e.location))];
    const titles = [...new Set(result.map(e => e.jobTitle))];
    this.setState({ employees: result, departments, locations, titles });
  }
  
  render() {
    const { departments, locations, titles } = this.state;
    const ready = !!this.state.employees.length;
    const employees = this.state.employees.map(employee => <Employee {...employee} />)
    return (
      <div className="container-fluid">
        <header className="d-flex justify-content-center">
          <h1>Employee Directory</h1>
        </header>
        <Search />
        <section className="d-flex">
          <Filter name="Department" options={departments} />
          <Filter name="Title" options={titles} />
          <Filter name="Location" options={locations} />
        </section>
        <section className="d-flex">
          <ul className="list-group flex-grow-1">
            <Placeholder ready={ready} employees={employees} />
          </ul>
        </section>
      </div>
    );
  }
}

import React, { Component } from 'react';
import 'react-placeholder/lib/reactPlaceholder.css';

import { Search, Filter, EmployeeList, Employee } from './components';
import getEmployees from './client';

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
    const employees = this.state.employees
      .sort((a,b) => a.lastName > b.lastName)
      .map(employee => <Employee key={employee.id} {...employee} />)
    return (
      <div className="container-fluid">
        <header className="d-flex justify-content-center">
          <h1>Employee Directory</h1>
        </header>
        <Search />
        <section className="d-flex flex-sm-row flex-column">
          <Filter name="Department" options={departments} />
          <Filter name="Title" options={titles} />
          <Filter name="Location" options={locations} />
        </section>
        <section className="d-flex">
          <ul className="list-group flex-grow-1">
            <EmployeeList ready={ready} employees={employees} />
          </ul>
        </section>
      </div>
    );
  }
}

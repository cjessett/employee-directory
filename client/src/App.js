import React, { Component } from 'react';
import 'react-placeholder/lib/reactPlaceholder.css';

import { Search, Filter, EmployeeList, Employee } from './components';
import getEmployees from './client';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      employees: [],
      departments: [],
      locations: [],
      titles: [],
      department: '',
      location: '',
      title: '',
    };
  }

  async componentDidMount() {
    const { result } = await getEmployees();
    const departments = [...new Set(result.map(e => e.department))];
    const locations = [...new Set(result.map(e => e.location))];
    const titles = [...new Set(result.map(e => e.jobTitle))];
    this.setState({ employees: result, departments, locations, titles });
  }
  
  handleSelect(e) {
    const { id, value } = e.target;
    const name = id.toLowerCase();
    if (name === 'department') this.setState({ title: '' });
    this.setState({ [name]: value });
  }
  
  getVisibleEmployees(employees) {
    const { department, location, title } = this.state;
    const departmentFilter = el => department ? el.department === department : true;
    const locationFilter = el => location ? el.location === location : true;
    const titleFilter = el => title ? el.jobTitle === title : true;
    return employees
      .filter(departmentFilter)
      .filter(locationFilter)
      .filter(titleFilter);
  }
  
  render() {
    const { departments, locations, department, location, title } = this.state;
    const ready = !!this.state.employees.length;
    const visibleEmployees = this.getVisibleEmployees(this.state.employees);
    const employees = visibleEmployees
      .sort((a,b) => a.lastName > b.lastName)
      .map(employee => <Employee key={employee.id} {...employee} />)
    const visibleTitles = [...new Set(visibleEmployees.map(e => e.jobTitle))]
    return (
      <div className="container-fluid">
        <header className="d-flex justify-content-center">
          <h1>Employee Directory</h1>
        </header>
        <Search />
        <section className="d-flex flex-sm-row flex-column">
          <Filter name="Department" options={departments} value={department} onSelect={e => this.handleSelect(e)} />
          <Filter name="Title" options={visibleTitles} value={title} onSelect={e => this.handleSelect(e)} />
          <Filter name="Location" options={locations} value={location} onSelect={e => this.handleSelect(e)} />
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

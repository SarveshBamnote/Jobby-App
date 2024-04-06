import {Component} from 'react'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
    isChecked: false,
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
    isChecked: false,
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
    isChecked: false,
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
    isChecked: false,
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Filters extends Component {
  onChangeEmployee = event => {
    const {updateEmploymentTypes} = this.props
    updateEmploymentTypes(event.target.value)
  }

  onChangeSalary = event => {
    const {updateSalaryRange} = this.props
    updateSalaryRange(event.target.value)
  }

  displayEmployeeType = each => {
    const {label, employmentTypeId} = each
    return (
      <li className="filters-list-item" key={employmentTypeId}>
        <input
          className="filters-input"
          type="checkbox"
          id={employmentTypeId}
          value={employmentTypeId}
          onChange={this.onChangeEmployee}
        />
        <label className="filters-label" htmlFor={employmentTypeId}>
          {label}
        </label>
      </li>
    )
  }

  displaySalaryRange = each => {
    const {label, salaryRangeId} = each
    return (
      <li className="filters-list-item" key={salaryRangeId}>
        <input
          className="filters-input"
          type="radio"
          id={salaryRangeId}
          name="salary"
          value={salaryRangeId}
          onChange={this.onChangeSalary}
        />
        <label className="filters-label" htmlFor={salaryRangeId}>
          {label}
        </label>
      </li>
    )
  }

  render() {
    return (
      <div className="filters-container">
        <>
          <h1 className="filter-heading">Type of Employment</h1>
          <ul className="filters-list">
            {employmentTypesList.map(each => this.displayEmployeeType(each))}
          </ul>
        </>
        <hr className="separator" />
        <>
          <h1 className="filter-heading">Salary Range</h1>
          <ul className="filters-list">
            {salaryRangesList.map(each => this.displaySalaryRange(each))}
          </ul>
        </>
      </div>
    )
  }
}

export default Filters

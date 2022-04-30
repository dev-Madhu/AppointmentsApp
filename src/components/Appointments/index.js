// Write your code here

import {Component} from 'react'

import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointments: [],
    nameInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleFavorite = id => {
    this.setState(prevState => ({
      appointments: prevState.appointments.map(each => {
        if (each.id === id) {
          return {...each, isLiked: !each.isLiked}
        }
        return each
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddButton = event => {
    event.preventDefault()
    const {nameInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      name: nameInput,
      date: formattedDate,
      isLiked: false,
    }
    this.setState(prevState => ({
      appointments: [...prevState.appointments, newAppointment],
      nameInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointments, isFilterActive} = this.state

    if (isFilterActive) {
      return appointments.filter(
        eachTransaction => eachTransaction.isLiked === true,
      )
    }
    return appointments
  }

  render() {
    const {nameInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="appointments">
          <div className="front-view">
            <div className="text-section">
              <form className="form" onSubmit={this.onAddButton}>
                <h1 className="app-heading"> Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={nameInput}
                  placeholder="Title"
                  className="input"
                  onChange={this.onChangeNameInput}
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  placeholder="dd/mm/yyyy"
                  className="input"
                  onChange={this.onChangeDate}
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="image"
                alt="appointments"
              />
            </div>
            <hr className="hr-line" />
            <div className="below-view">
              <h1 className="heading">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>

            <ul className="appoint-lists">
              {filteredAppointmentsList.map(eachApp => (
                <AppointmentItem
                  key={eachApp.id}
                  appointDetails={eachApp}
                  toggleFavorite={this.toggleFavorite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments

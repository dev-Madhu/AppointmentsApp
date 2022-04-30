// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointDetails, toggleFavorite} = props
  const {id, name, date, isLiked} = appointDetails
  const likedImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleFavorite(id)
  }

  return (
    <li className="appointment-item">
      <div className="header-container">
        <p className="title">{name}</p>
        <button
          type="button"
          testid="star"
          className="star-button"
          onClick={onClickStar}
        >
          <img src={likedImgUrl} className="star" alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem

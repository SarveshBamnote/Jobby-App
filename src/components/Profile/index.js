import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    profileDetails: '',
    profileApiStaus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({
      profileApiStaus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileApiStaus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profileApiStaus: apiStatusConstants.failure,
      })
    }
  }

  renderProfile = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-details-container">
        <img className="profile-image" src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">Sarvesh Bamnote</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileLoader = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailure = () => (
    <div className="profile-failure-container">
      <button
        className="retry-button"
        type="button"
        onClick={() => this.getProfile()}
      >
        Retry
      </button>
    </div>
  )

  checkProfileApiStaus = () => {
    const {profileApiStaus} = this.state
    switch (profileApiStaus) {
      case apiStatusConstants.inProgress:
        return this.renderProfileLoader()
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  render() {
    return <div>{this.checkProfileApiStaus()}</div>
  }
}

export default Profile

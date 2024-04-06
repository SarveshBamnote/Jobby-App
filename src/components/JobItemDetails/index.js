import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsApiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  updateToCamelCase = data => {
    const jobDetails = data.job_details

    const updatedJobDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      location: jobDetails.location,
      rating: jobDetails.rating,
      title: jobDetails.title,
      packagePerAnnum: jobDetails.package_per_annum,
      skills: jobDetails.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      })),
      lifeAtCompnay: {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      },
    }

    const similarJobs = data.similar_jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

    return {updatedJobDetails, similarJobs}
  }

  getJobItemDetails = async () => {
    this.setState({jobDetailsApiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {updatedJobDetails, similarJobs} = this.updateToCamelCase(data)
      this.setState({
        jobDetailsApiStatus: apiStatusConstants.success,
        jobDetails: updatedJobDetails,
        similarJobs,
      })
    } else {
      this.setState({jobDetailsApiStatus: apiStatusConstants.failure})
    }
    console.log(data)
  }

  renderLoaderView = () => (
    <div className="job-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="job-detail-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-detail-failure-image"
      />
      <h1 className="job-detail-failure-heading">Oops! Something Went Wrong</h1>
      <p className="job-detail-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={() => this.getJobItemDetails()}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
      packagePerAnnum,
      companyWebsiteUrl,
      skills,
      lifeAtCompnay,
    } = jobDetails

    return (
      <div className="job-details-container">
        <div className="job-details">
          <div className="job-logo-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-logo"
            />
            <div>
              <h1 className="job-title">{title}</h1>
              <div className="job-rating-container">
                <AiFillStar className="job-star-icon" />
                <p className="job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-location-salary-container">
            <div className="icon-text-container">
              <IoLocationSharp className="icons" />
              <p className="job-text">{location}</p>
            </div>
            <div className="icon-text-container">
              <BsFillBriefcaseFill className="icons" />
              <p className="job-text">{employmentType}</p>
            </div>
            <p className="package-text">{packagePerAnnum}</p>
          </div>

          <hr className="separator" />
          <div className="description-visit-link-container">
            <h1 className="job-desc-heading">Description</h1>
            <a href={companyWebsiteUrl} className="company-link">
              Visit
              <FiExternalLink className="company-link-logo" />
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(eachSkill => {
              const {imageUrl, name} = eachSkill
              return (
                <li className="skill-item" key={name}>
                  <img src={imageUrl} alt={name} className="skill-image" />
                  <p className="skill-name">{name}</p>
                </li>
              )
            })}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="company-life-container">
            <p className="life-description">{lifeAtCompnay.description}</p>
            <img
              className="life-image"
              src={lifeAtCompnay.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(eachJob => (
            <SimilarJobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetailsPage = () => {
    const {jobDetailsApiStatus} = this.state

    switch (jobDetailsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-page">
        <Header />
        {this.renderJobDetailsPage()}
      </div>
    )
  }
}

export default JobItemDetails

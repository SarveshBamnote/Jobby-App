import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-card">
      <div className="job-logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="job-desc-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="job-location-salary-container">
        <div className="icon-text-container">
          <IoLocationSharp className="icons" />
          <p className="job-text">{location}</p>
        </div>
        <div className="icon-text-container">
          <BsFillBriefcaseFill className="icons" />
          <p className="job-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard

import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetail} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetail

  return (
    <li className="job-card-container">
      <Link to={`/jobs/${id}`} className="job-card-link">
        <div className="job-logo-title-container">
          <img className="job-logo" src={companyLogoUrl} alt="company logo" />
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
        <h1 className="job-desc-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobCard

// Write your code here
import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {eachCardDetails} = props
  const {name, id, teamImageUrl} = eachCardDetails
  console.log(name, id, teamImageUrl)

  return (
    <Link className="route-link" to={`/team-matches/${id}`}>
      <li className="list-item">
        <img src={teamImageUrl} alt={name} className="list-item-image" />
        <p className="list-para">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard

// Write your code here
import './index.css'

const MatchCard = props => {
  const {eachMatchCardDetails} = props
  const {
    result,
    matchStatus,
    competingTeam,
    competingTeamLogo,
  } = eachMatchCardDetails

  const getMatchClassName = status =>
    status === 'Won' ? 'match-won' : 'match-lost'

  const getMatchStatus = `match-status ${getMatchClassName(matchStatus)}`

  return (
    <li className="match-item">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="competing-team-logo"
      />
      <p className="competing-team-name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={getMatchStatus}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard

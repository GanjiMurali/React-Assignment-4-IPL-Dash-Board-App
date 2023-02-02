// Write your code here
import './index.css'
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {teamMatchesData: {}, isLoading: true}

  componentDidMount() {
    this.getBlogDetails()
  }

  updatedLatestMatchDetails = details => ({
    umpires: details.umpires,
    result: details.result,
    manOfTheMatch: details.man_of_the_match,
    id: details.id,
    date: details.date,
    venue: details.venue,
    competingTeam: details.competing_team,
    competingTeamLogo: details.competing_team_logo,
    firstInnings: details.first_innings,
    secondInnings: details.second_innings,
    matchStatus: details.match_status,
  })

  getBlogDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)
    // console.log(data.recent_matches)

    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.updatedLatestMatchDetails(
        data.latest_match_details,
      ),
      recentMatches: data.recent_matches.map(eachItem =>
        this.updatedLatestMatchDetails(eachItem),
      ),
    }

    this.setState({teamMatchesData: formattedData, isLoading: false})
  }

  renderRecentMatches = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData
    // console.log(recentMatches)
    return (
      <ul className="recent-matches-list">
        {recentMatches.map(eachMatch => (
          <MatchCard eachMatchCardDetails={eachMatch} key={eachMatch.id} />
        ))}
      </ul>
    )
  }

  renderRouteMatch = () => {
    const {teamMatchesData} = this.state
    const {teamBannerUrl, latestMatchDetails} = teamMatchesData
    return (
      <div className="responsive-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        {this.renderRecentMatches()}
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="red" height={50} />
    </div>
  )

  getBgColor = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'sh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const bgColor = `team-matches-container ${this.getBgColor()}`

    // console.log(teamMatchesData)
    return (
      <div className={bgColor}>
        {isLoading ? this.renderLoader() : this.renderRouteMatch()}
      </div>
    )
  }
}

export default TeamMatches

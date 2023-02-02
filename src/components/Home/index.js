// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

import TeamCard from '../TeamCard'

class Home extends Component {
  state = {teamCardsData: [], isLoder: true}

  componentDidMount() {
    this.getTeamCardsDataFromApi()
  }

  getTeamCardsDataFromApi = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchedData = await response.json()

    this.setState({
      teamCardsData: fetchedData.teams.map(eachCard => ({
        name: eachCard.name,
        id: eachCard.id,
        teamImageUrl: eachCard.team_image_url,
      })),
      isLoder: false,
    })

    // console.log(fetchedData)
  }

  renderIplTeamsData = () => {
    const {teamCardsData} = this.state

    return (
      <div className="home-container">
        <div className="heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="heading-img"
          />
          <h1 className="main-heading">IPL Dashboard</h1>
        </div>
        <div className="">
          <ul className="unOrder-list">
            {teamCardsData.map(eachCard => (
              <TeamCard eachCardDetails={eachCard} key={eachCard.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Rings" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoder} = this.state

    return (
      <div>{isLoder ? this.renderLoader() : this.renderIplTeamsData()}</div>
    )
  }
}

export default Home

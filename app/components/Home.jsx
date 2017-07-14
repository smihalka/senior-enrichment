import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import WinterJokes from './Root'
function Home (props) {
    ///select random school for selection
    const randomNum = () => {
      return Math.floor(Math.random() * (props.campuses.length - 1 + 1)) + 0
    }
    const random = randomNum()
    const campusOfTheDay = props.campuses[+random]
    console.log(campusOfTheDay)
    if(campusOfTheDay){
    return (
      <div>
        <h1> Welcome To Margies Campus World!</h1>
        <h2> Campus of the day: {campusOfTheDay.name} </h2>
        <div className='displayimg'><Link to={`/campuses`}>
          <img src={campusOfTheDay.image}/>
        </Link></div>
        <h2>Margie's Wisdom</h2>
        <h4>Yes, she talks about herself in the third person...</h4>
        <div className='pappaSmurf'>

          <div className='babySmurf'>
            <p>Here at campus world, Margie knows all the tricks</p>
            <p>You want a good job? Margie, has a good job, so she knows how to get one!</p>
            <p>You want to work for the governement? Lame...</p>
          </div>
          <div className='babySmurf'>
            <p>Be an academic? Ok, Margie can figure!</p>
            <p>Be an <b>astronot</b>? Well Margie can't spell it, so go to NASA!</p>
            <p>Margie can make you as cool as <b>Tom</b> and <b>John</b>!!!
            So don't pass that up, cause FullStack is the Bomb Digity</p>
          </div>
        </div>
        <div>
          <h3>Like Jokes? here is a fun thingy that Margie found!!!</h3>
          <WinterJokes/>
        </div>
      </div>
    )
  }else{
    return(<div>{random} Loading.......</div>)
  }
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}
const ContainerHome = connect(mapStateToProps,null)(Home)
export default ContainerHome

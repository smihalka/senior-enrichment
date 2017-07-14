import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

function Home (props) {

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




        <div className='pappaSmurf'>
          <div className='front'>
            <p>Here at campus world, Margie knows all the tricks</p>
            <p>You want a good job? Margie, has a good job, so she knows how to get one!</p>
            <p>You want to work for the governement? Why, thats not a good idea...</p>
          </div>
          <div className='front'>
            <p>Be an academic? Ok, Margie can figure!</p>
            <p>Margie can even make you as cool as Tom and John!!!</p>
          </div>
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
const mapDispatchToProps= (dispatch,ownProps) => {
  return {
    // handleDelete(event){
    //   if(confirm(`Please confirm delete of ...${event.target.dataset.name}`)){
    //     dispatch(removeCampus(event.target.dataset.value))
    //   }
    // },
    // handleClick(event){
    //   ownProps.history.push(`/campuses/${event.target.dataset.id}/students`)
    // }
  }
}
const ContainerHome = connect(mapStateToProps,mapDispatchToProps)(Home)
export default ContainerHome

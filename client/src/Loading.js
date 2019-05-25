import React from 'react'
import ReactLoading from "react-loading"


const Loading = ({type, color}) => {
    
  return(
    <div className = "loading">
      <ReactLoading  type={'spinningBubbles'} color={'rgb(252, 107, 10)'} height={'35%'} width={'35%'}/>
    </div>
  )
}




export default Loading
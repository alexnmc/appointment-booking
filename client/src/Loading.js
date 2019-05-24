import React from 'react'
import ReactLoading from "react-loading"


const Loading = ({type, color}) => {
    
  return(
    <div className = "loading">
      <ReactLoading  type={'spin'} color={'orange'} height={'25%'} width={'25%'}/>
    </div>
  )
}




export default Loading
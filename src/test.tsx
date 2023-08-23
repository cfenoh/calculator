import React, { createContext, useContext } from "react";
import { findAllByLabelText } from "@testing-library/react";

const myContext =  React.createContext({)

const ContextWrapper : React.PropsWithChildren = ({children})=>{
  const [] =
  return <myContext.Provider value={{
    data:2
  }}>
    {children}
  </myContext.Provider>
}


const useData:React.FC = ()=>{
  const data = useContext('myContext')
  if(!data){
    throw 'this comp should be used within ContextWrapper'
  }
  return data
}


const testComponent:React.FC = ()=>{
  const data = useData()
    return <div>
    {data}
  </div>
}



const MyHOC : React.FC = ()=>{


}

const myComp : React.FC = ()=>{
  const [value, setValue] = React.useState()

  const handleChange = (e)=>{
    setValue(e.currentTarget.value)
  }

  return <>
      <input type="text" value="1" />

      <label>
        Controlled Component
        <input type="text" onChange={handleChange} value={value}/>
      </label>
    </>
}
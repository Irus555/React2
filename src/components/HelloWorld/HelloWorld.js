import { useContext, useRef } from "react"
import { MyContext } from "../../context/myContext"
import { ButtonUI } from "../ui/ButtonUI/ButtonUI"
import { useParams } from 'react-router-dom'


export const HelloWorld = (props) => {
  const params = useParams();
  console.log(params)
  const context = useContext(MyContext)
  console.log('context:', context)

  const myRef = useRef()

  const submit = () => {
    console.log('myRef', myRef)
    console.log('Success submit! Input value:', myRef.current.value)
  }
  return (
    <>
      <p>{context.text}</p>
      <input ref={myRef} name="" placeholder='type email' lable={'1234'}/>
      <ButtonUI label={'Click'} />
    </>
  )
}

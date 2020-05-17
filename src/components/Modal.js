import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const modalRoot = document.getElementById('modal')

const Modal = (props) => {
  const element = document.createElement('div')
  element.classList.add('overlay')

  useEffect(() => {
    modalRoot.appendChild(element)
    return () => {
      modalRoot.removeChild(element)
    }
  })

  return createPortal(props.children, element)
}

export default Modal

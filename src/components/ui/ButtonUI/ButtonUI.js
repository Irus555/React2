import React from 'react'
import { Button } from 'antd'

export const ButtonUI = ({ label, onClick }) => {
  return (
    <>
      <Button type="primary" onClick={onClick} size='small'>{label}</Button>
    </>
  )
}


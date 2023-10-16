import Title from '@/components/Title'
import ResetPass from '@/components/authentification/ResetPass'
import React from 'react'

function ResetPage() {
  return (
    <>
        <Title title='Reset Your PassWord' />
        <ResetPass />
    </>
  )
}

export default ResetPage
ResetPage.getLayout = function pageLayout(page){
    return (
        <>
        {page}
        </>
    )
  }
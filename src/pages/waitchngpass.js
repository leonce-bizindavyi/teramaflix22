import Title from '@/components/Title'
import Waitingchang from '@/components/authentification/Waitchang'
import React from 'react'

function ResetPage() {
  return (
    <>
        <Title title='' />
        <Waitingchang/>
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
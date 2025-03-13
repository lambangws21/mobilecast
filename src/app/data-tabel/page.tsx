import TotalAmountCard from '@/components/mobile/dataAdvance/TotalOperasiCard'
import  LoadingCard from "@/components/loading/loading-card"
import LoadingDots from '@/components/loading/loading-three-ball'
import React from 'react'
import ProfileCard from '@/components/mobile/new-peofilecard'

const DataTable = () => {
  return (
    <div><TotalAmountCard />
    <ProfileCard/>
    <LoadingCard />
    <LoadingDots/>
    </div>
  )
}

export default DataTable
import TotalAmountCard from '@/components/mobile/dataAdvance/TotalOperasiCard'
import  LoadingCard from "@/components/loading/loading-card"
import LoadingDots from '@/components/loading/loading-three-ball'
import React from 'react'
import ProfileCard from '@/components/mobile/new-peofilecard'
import NewSlide from "@/components/mobile/new-slide-content"

const DataTable = () => {
  return (
    <div><TotalAmountCard />
    <ProfileCard/>
    <LoadingCard />
    <LoadingDots/>
    <NewSlide/>
    </div>
  )
}

export default DataTable
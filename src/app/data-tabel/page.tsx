import TotalAmountCard from '@/components/mobile/dataAdvance/TotalOperasiCard'
import  LoadingCard from "@/components/loading/loading-card"
import LoadingDots from '@/components/loading/loading-three-ball'
import React from 'react'

const DataTable = () => {
  return (
    <div><TotalAmountCard />
    <LoadingCard />
    <LoadingDots/>
    </div>
  )
}

export default DataTable
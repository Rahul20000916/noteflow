'use client'
import { ChevronLeftCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
const BackButton = () =>{
    const router = useRouter()

  return (
    <button className='btn' onClick={()=>router.back()}>
        <ChevronLeftCircle />Back
    </button>
  )
}

export default BackButton

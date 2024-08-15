import React from 'react'
import BreadCrumb from '../components/common/BreadCrumb'
import { styles } from '../components/Styles/styles'

type Props = {}

const AuctionsPage: React.FC<Props> = ({}) => {
  return (
    <div className={`${styles.page} pt-3`}>
        <BreadCrumb name='Auctions'/>
        <div>AuctionsPage</div>
    </div>
  )
}

export default AuctionsPage;
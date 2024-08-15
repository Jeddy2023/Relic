import React from 'react'
import BreadCrumb from '../components/common/BreadCrumb'
import { styles } from '../components/Styles/styles'

type Props = {}

const AboutPage: React.FC<Props> = ({}) => {
  return (
    <div className={`${styles.page} pt-3`}>
        <BreadCrumb name='About Us'/>
        <div>AboutPage</div>
    </div>
  )
}

export default AboutPage
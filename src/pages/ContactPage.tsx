import React from 'react'
import BreadCrumb from '../components/common/BreadCrumb'
import { styles } from '../components/Styles/styles'

type Props = {}

const ContactPage: React.FC<Props> = ({}) => {
  return (
    <div className={`${styles.page} pt-3`}>
        <BreadCrumb name='Contact Us'/>
        <div>ContactPage</div>
    </div>
  )
}

export default ContactPage
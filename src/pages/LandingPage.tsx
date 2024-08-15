import React from 'react'
import Hero from '../components/landing/Hero';
import { styles } from '../components/Styles/styles';

type Props = {}

const LandingPage: React.FC<Props> = ({ }) => {
    return (
        <div className={`${styles.page} pt-3`}>
            <Hero/>
        </div>
    )
}

export default LandingPage;
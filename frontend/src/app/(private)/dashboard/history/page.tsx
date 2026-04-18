// Importing the necessary modules 
import React, { Fragment } from 'react'
import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/navbar'

const History = () => {
    return (
        <Fragment>
            {/* Adding the navbar */}
            <Navbar />

            {/* Adding the main div */}
            <main className="h-screen md:p-7.5 p-7.5">
                <p> History Page </p>
            </main>

            {/* Adding the footer page */}
            <Footer />
        </Fragment>

    )
}

// Exporting the history component 
export default History
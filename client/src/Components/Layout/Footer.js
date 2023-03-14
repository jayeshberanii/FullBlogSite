import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer>
            <div className="text-center p-4 mt-4 bg-light">
                © 2021 Copyright:&nbsp;&nbsp;&nbsp;
                <Link className="text-reset fw-bold" to="/">@Jayesh Berani</Link>
            </div>
        </footer>
    )
}

export default Footer
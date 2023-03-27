import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer>
            <div className="footer text-center p-3 mt-4 textwhite">
                © 2021 Copyright:&nbsp;&nbsp;&nbsp;
                <Link className="text-reset fw-bold" to="/">@Jayesh Berani</Link>
            </div>
        </footer>
    )
}

export default Footer
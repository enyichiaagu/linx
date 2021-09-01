import React from 'react'

function Footer() {

    const style = {
        height: "7vh",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    } 

    return (
        <div style={style}>
            <p>Made with {"<3"} by Enyichi A. Agu</p>
        </div>
    )
}

export default Footer

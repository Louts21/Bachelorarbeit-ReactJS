import React, { Component } from "react"

class Header extends Component {
    render() {
        return <div id="header">
            <div id="leftStuff">
                <a className="leftHeaderItems" href="/">
                    Back to main
                </a>
                <a className="leftHeaderItems" href="/data"> API Data </a>
            </div>
        </div>
    }
}

export default Header;
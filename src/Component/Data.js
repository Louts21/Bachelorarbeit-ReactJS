import React, { Component } from "react"

import { nominatimReverse, nominatim, getDataOfGivenURL } from "../extern/axios";
import { fillJSONIfEmpty } from "../extern/validator";

class Data extends Component {
    state = {
        nominatimReverseData: null,
        nominatim: null,
        ownDatabase: null,

        latInput: null,
        lonInput: null,
        streetnameInput: null,
        housenumberInput: null,
        cityInput: null,
        databaseUrlInput: null
    }

    async componentDidMount() {
        this.setState({ nominatimReverseData: await nominatimReverse('52.536940', '13.649490') });
        this.setState({ nominatim: await nominatim('Käthe-Kollwitz-Straße', '12', 'Luckenwalde') });
        this.setState({ ownDatabase: fillJSONIfEmpty(await getDataOfGivenURL()) });
    }

    saveInput = (event) => {
        if (event.target.id === "inputLat") {
            this.setState({ latInput: event.target.value });
        } else if (event.target.id === "inputLon") {
            this.setState({ lonInput: event.target.value });
        } else if (event.target.id === "inputStreetname") {
            this.setState({ streetnameInput: event.target.value });
        } else if (event.target.id === "inputHousenumber") {
            this.setState({ housenumberInput: event.target.value });
        } else if (event.target.id === "inputCity") {
            this.setState({ cityInput: event.target.value });
        } else if (event.target.id === "inputDatabaseURL") {
            this.setState({ databaseUrlInput: event.target.value });
        }
    }

    // TODO change name
    submitOnClick = async (event) => {
        if (event.target.id === "nominatimReverseButton") {
            if (this.state.latInput != null && this.state.lonInput != null) {
                this.setState({ nominatimReverseData: await nominatimReverse(this.state.latInput, this.state.lonInput) });
            }
        } else if (event.target.id === "nominatimButton") {
            if (this.state.streetnameInput != null && this.state.housenumberInput && this.state.cityInput) {
                this.setState({ nominatim: await nominatim(this.state.housenumberInput, this.state.streetnameInput, this.state.cityInput) });
            }
        } else if (event.target.id === "databaseButton") {
            if (this.state.databaseUrlInput != null) {
                this.setState({ ownDatabase: await getDataOfGivenURL(this.state.databaseUrlInput) });
            }
        }

    }

    changeNominatim = async () => {
        this.setState({ nominatimReverseData: await nominatimReverse(this.state.latInput, this.state.lonInput) });
    }

    render() {
        if (this.state.nominatimReverseData != null && this.state.nominatim != null && this.state.ownDatabase != null) {
            return <div>
                <div class="dataItems">
                    Nominatim Reverse: {this.state.nominatimReverseData.address.road}, {this.state.nominatimReverseData.address.hamlet}, {this.state.nominatimReverseData.address.city}
                    <p class="rightDataStuff">
                        Lat:
                        <input id="inputLat" type="text" placeholder="52.536940" onChange={this.saveInput} />
                        Lon:
                        <input id="inputLon" type="text" placeholder="13.649490" onChange={this.saveInput} />
                        <button id="nominatimReverseButton" class="submitButton" onClick={this.submitOnClick}>
                            Submit
                        </button>
                    </p>
                </div >
                <div class="dataItems">
                    Nominatim: {this.state.nominatim[0].lat}, {this.state.nominatim[0].lon}
                    <p class="rightDataStuff">
                        Street name:
                        <input id="inputStreetname" type="text" placeholder="Käthe-Kollwitz-Straße" onChange={this.saveInput} />
                        House number:
                        <input id="inputHousenumber" type="text" placeholder="12" onChange={this.saveInput} />
                        City:
                        <input id="inputCity" type="text" placeholder="Luckenwalde" onChange={this.saveInput} />
                        <button id="nominatimButton" class="submitButton" onClick={this.submitOnClick}>Submit</button>
                    </p>
                </div >
                <div class="dataItems">
                    Own DB data:
                    <pre>{JSON.stringify(this.state.ownDatabase.data)}</pre>
                    <p class="rightDataStuff">
                        Database URL:
                        <input id="inputDatabaseURL" type="text" placeholder="..." onChange={this.saveInput} />
                        <button id="databaseButton" class="submitButton" onClick={this.submitOnClick}>Submit</button>
                    </p>
                </div >
            </div>
        }
    }
}

export default Data;

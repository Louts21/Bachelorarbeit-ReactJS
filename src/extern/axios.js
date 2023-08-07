import axios from 'axios'
import { isNumericString } from './validator'

//--Variables--------------------------------------------------------------------------------------------------------------------------------------------

const emptyJson = {};

//--Methods----------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Fetchs an address due to latitude and longitude
 * @param {string} lat
 * @param {string} lon
 * @returns JSON file
 */
const nominatimReverse = async (lat, lon) => {
  if (isNumericString(lat) && isNumericString(lon)) {
    const url = new URL('https://nominatim.openstreetmap.org/reverse')
    const { data } = await axios.get(url.href + `?lat=${lat}&lon=${lon}&format=json`)

    return data
  } else {
    alert("lat and lon was not a number");
  }
  return emptyJson;
}

/**
 * Fetchs longitude and latitude due to an address
 * @param {string} streetname required
 * @param {string} housenumber required
 * @param {string} city required
 * @param {string} county
 * @param {string} state
 * @param {string} country
 * @param {string} postalcode
 * @returns JSON file
 */
const nominatim = async (streetname, housenumber, city, county, state, country, postalcode) => {
  const url = new URL('https://nominatim.openstreetmap.org/search?')

  if (housenumber && streetname && city) {
    if (isNumericString(housenumber)) {
      url.href += `street=${housenumber} ${streetname}&city=${city}`
    } else {
      alert("Housenumber was not a number")
      return emptyJson;
    }
    if (county) {
      url.href += `&county=${county}`
    }
    if (state) {
      url.href += `&state=${state}`
    }
    if (country) {
      url.href += `&country=${country}`
    }
    if (postalcode) {
      if (isNumericString(postalcode)) {
        url.href += `&postalcode=${postalcode}`
      } else {
        alert("Postalcode was not a number")
        return emptyJson;
      }
    }
  } else {
    alert('Streetname, housenumber and city is required!!!')
    return emptyJson;
  }

  const { data } = await axios.get(url.href + `&format=json`)

  return data
}

/**
 * Fetchs data of a given URL
 * @param {URL} givenUrl string and required
 * @returns JSON file
 */
const getDataOfGivenURL = async (givenUrl) => {
  let url = null;
  try {
    url = new URL(givenUrl)
  } catch (e) {
    console.log(e);
  }

  if (url) {
    try {
      const { data } = await axios.get(url.href)
      return data
    } catch (e) {
      alert("Could not find DB-URL")
    }
  } else {
    return emptyJson;
  }
}

//--Export-----------------------------------------------------------------------------------------------------------------------------------------------

export { nominatimReverse, nominatim, getDataOfGivenURL }

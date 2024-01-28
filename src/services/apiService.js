import axios from 'axios';


const API_BASE_URL = 'http://localhost:8000';

export const getLocationImage = async (address) => {
  try {
    const encodedAddress = encodeURIComponent(address)
    const response = await axios.get(
      `${API_BASE_URL}/get_location_image?address=${encodedAddress}`,
      {responseType: 'blob'}
    )
    return URL.createObjectURL(response.data)
  } catch (error) {
    console.log(error)
  }
};

export function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
  return new Blob([u8arr], {type:mime});
}

export const submitImage = async (formData) => {
    try {
        axios.post(
            `${API_BASE_URL}/submit_image`, 
            formData, 
            {headers: {'Content-Type': 'multipart/form-data'}}
        )
        console.log('Success!')
    } catch (error) {
        console.log(error)
    }
}

// 3rd party APIs
const GEOAPIFY_BASE_URL = 'https://api.geoapify.com/v1/geocode/autocomplete?lang=en&limit=5&filter=rect:-125,24.396308,-66.93457,49.384358'

export const addressAutoComplete = async (text) => {
    try {
        const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY
        const response = await axios.get(`${GEOAPIFY_BASE_URL}&text=${text}&apiKey=${apiKey}`)
        return response.data.features
    } catch (error) {
        console.log(error)
    }
}
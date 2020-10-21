import { readString } from 'react-papaparse'

const fetchJson = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    const header = `timestamp,open,high,low,close,volume`
    const config = { header: true }
    if (response.ok) {
      return response.json().then(
        (csvData) => {
          csvData.unshift(header)
          const dataString = csvData.join('\n')
          const responseData = readString(dataString, config)
          return responseData
        }
      )
    }
    return Promise.reject(new Error('Server error: Please try later.'));
  }
  catch (error) {
    return Promise.reject(new Error('Network error: Please try later.'));
  }
};

export default fetchJson;

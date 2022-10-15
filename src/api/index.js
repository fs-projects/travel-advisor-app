import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        method: "GET",
        url: URL,
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_API_KEY}`,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error) {
    // console.log("Error calling places api", error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          method: "GET",
          params: {
            lon: lng,
            lat: lat,
            appid: `${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`,
          },
        }
      );

      return data;
    }
  } catch (error) {
    // console.log("Error calling weather api", error);
  }
};

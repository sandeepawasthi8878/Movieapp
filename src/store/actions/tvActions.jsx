import axios from "../../Utils/Axios";
import { loadtv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/tv/${id}`); // General TV show details including external IDs
    const externalid = await axios.get(`/tv/${id}/external_ids`); // Corrected endpoint

    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);

    let theultimatedetails = {
      detail: details.data, // TV show details, including external IDs
      externalid: externalid.data, // External IDs fetched correctly
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map(t => t.english_name),
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };

    console.log(theultimatedetails);

    dispatch(loadtv(theultimatedetails));
  } catch (error) {
    console.log("Error:", error);
  }
};

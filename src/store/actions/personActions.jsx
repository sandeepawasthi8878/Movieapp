import axios from "../../Utils/Axios";
import { loadperson } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch, getState) => {
  try {
    // General person details including external IDs
    const details = await axios.get(`/person/${id}`);

    // Other data like credits
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);

    let theultimatedetails = {
      detail: details.data,
      externalid: details.data.external_ids, 
      combinedCredits: combinedCredits.data,
      movieCredits: movieCredits.data,
      tvCredits: tvCredits.data,
    };

    console.log(theultimatedetails);

    dispatch(loadperson(theultimatedetails));
  } catch (error) {
    console.log("Error:", error);
  }
};

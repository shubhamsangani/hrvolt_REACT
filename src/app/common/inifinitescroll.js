import axios from "axios";

export const modifyData = (data, label_key, value_key) => {
  return label_key && value_key
    ? data
        ?.map((obj) => ({
          value: obj?.[value_key],
          label: obj?.[label_key],
        }))
        ?.filter((obj) => obj?.value && obj?.label)
    : data;
};


export const infiniteScrollApiCall = async ({
  apiEndpoint,
  payload,
  label_key,
  value_key,
}) => {
  const response = await axios
    .post(apiEndpoint, payload)
    .then((res) => {
      return {
        ...res?.data,
        Data: modifyData(res.data?.Data || [], label_key, value_key),
      };
    })
    .catch((err) => {
      console.log("API request error:", err);
    });
  return response;
};


export const getUniqueRec = (arr, compArr) => {
  const modData = [...arr];
  compArr?.forEach((obj) => {
    if (!modData?.find((o) => o?.value === obj?.value)) {
      modData.push(obj);
    }
  });
  return arr?.length ? modData : compArr;
};


// export const getCandidateTechSkills = async ({ apiEndpoint, payload }) => {
//   const response = await axios
//     .post(apiEndpoint, payload)
//     .then((res) => {
//       return {
//         ...res?.data,
//       };
//     })
//     .catch((err) => {
//       console.log("API request error:", err);
//     });
//   return response;
// };
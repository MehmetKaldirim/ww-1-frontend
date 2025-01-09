import apiClient from "./apiClient";
import * as ImageManipulator from "expo-image-manipulator";

export const createRecord = async ({
  description,
  mintemp,
  maxtemp,
  wind,
  weatherData,
  photo,
}) => {
  const params = {
    description,
    mintemp,
    maxtemp,
    wind,
    weatherData,
  };

  if (photo) {
    const IMG_URI = "data:image/jpg;base64," + photo.base64;
    try {
      const compressedPhoto = await ImageManipulator.manipulateAsync(
        IMG_URI,
        [
          // {
          //     // crop: {
          //     //     width: Math.floor((photo.width - 165) / 2),
          //     //     originX: 165,
          //     //     originY: 0,
          //     //     height: photo.height
          //     // },
          //     // resize: {
          //     //     width: 300,
          //     //     height: 500,
          //     // }
          // }
        ],
        {
          format: ImageManipulator.SaveFormat.JPEG,
          compress: 0.4,
        }
      );

      const formData = new FormData();

      formData.append("image", {
        uri: compressedPhoto.uri,
        name: "image.jpg",
        type: "image/jpeg",
      });

      const jsonParams = JSON.stringify(params);

      formData.append("data", jsonParams);

      return apiClient.post("record/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (e) {
      console.log("record service 1 " + e);
    }
  }

  return apiClient.post("record/", params);
};

export const getAllRecords = () => {
  return apiClient.get("record/");
};

export const deleteRecord = (id) => {
  return apiClient.delete(`record/${id}`);
};

import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { postNewRecord } from "../redux/recordReducer";
import { selectWeatherData } from "../redux/weatherReducer";

export default function CameraScreen({ navigation }) {
  // Kamera izinleri
  const [permission, requestPermission] = useCameraPermissions();

  // Kamera türü (arka/front)
  const [facing, setFacing] = useState("back");

  // Çekilen fotoğraf
  const [photo, setPhoto] = useState(null);

  // Redux
  const { data } = useSelector(selectWeatherData);
  const description = useRoute().params;
  const dispatch = useDispatch();

  // Kamera referansı
  const cameraRef = useRef(null);

  // Fotoğraf çekme fonksiyonu
  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true, exif: false };
      const takenPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(takenPhoto);
    }
  };

  // Yeni kayıt oluşturma ve dispatch
  const handleCreateNewRecordWithPhoto = () => {
    const { currentDay } = data;
    const { mintemp, maxtemp, wind } = currentDay.recordData;
    const params = {
      mintemp,
      maxtemp,
      wind,
      description,
      weatherData: currentDay.weatherData,
      photo,
    };
    dispatch(postNewRecord(params));
    navigation.navigate("Home"); // Fotoğraf kaydedildikten sonra Home ekranına yönlendirme
  };

  // Kamera türünü değiştirme fonksiyonu
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  // Kamera izin durumu kontrolü
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Fotoğraf çekildiyse önizleme
  if (photo) {
    return (
      <View style={styles.container}>
        <Text style={styles.previewText}>Photo Preview</Text>
        <Button title="Retake Photo" onPress={() => setPhoto(null)} />
        <Button title="Save Record" onPress={handleCreateNewRecordWithPhoto} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.text}>Home</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  previewText: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
  },
});

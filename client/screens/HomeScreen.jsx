import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";

import { Box, Spinner, TextArea, Toast } from "native-base";
import ScreenTitle from "../components/ScreenTitle";
import WeatherSection from "../components/weather/WeatherSection";
import DetailsSection from "../components/details/DetailsSection";
import ButtonIcon from "../components/ButtonIcon";
import * as Location from "expo-location";
import { getUserName, removeToken, getToken } from "../services/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData, selectWeatherData } from "../redux/weatherReducer";
import moment from "moment";
import ErrorSection from "../components/ErrorSection";
import SkeletonLoader from "../components/SceletonLoader";
import { LOADING } from "../constants";
import {
  postNewRecord,
  resetNewRecordLoadingState,
  selectNewRecordData,
} from "../redux/recordReducer";
import { setIsAuth } from "../redux/userReducer";

export default HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(selectWeatherData);
  const {
    data: newRecordData,
    isLoading: isNewRecordLoading,
    error: newRecordError,
  } = useSelector(selectNewRecordData);

  const [userName, setUserName] = useState("friend");
  const [location, setLocation] = useState();
  const [locationError, setLocationError] = useState();
  const [description, setDescription] = useState();

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const { height, width } = Dimensions.get("window");
  const containerWidth = width;
  const maxHeight = height * 0.8;

  const handleOnLoad = (event) => {
    if (
      event.nativeEvent &&
      event.nativeEvent.source &&
      event.nativeEvent.source.dimensions
    ) {
      const { width, height } = event.nativeEvent.source.dimensions;
      setImageDimensions({ width, height });
    } else {
      console.error("Resim boyutları alınamadı:", event);
      setImageDimensions({ width: 1, height: 1 }); // Önleme amaçlı varsayılan değer
    }
  };

  const calculatedHeight =
    imageDimensions.width > 0 && imageDimensions.height > 0
      ? Math.min(
          maxHeight,
          containerWidth * (imageDimensions.height / imageDimensions.width)
        )
      : maxHeight;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationError(
          "Permission to access location was denied, change this in settings!"
        );
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(
        `${locationData.coords.latitude},${locationData.coords.longitude}`
      );
    })();
  }, []);

  useEffect(() => {
    if (location) {
      dispatch(fetchWeatherData(location));
    }
  }, [location]);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (!token) {
        dispatch(setIsAuth(false));
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    const handleUserName = async () => {
      try {
        const username = await getUserName();
        setUserName(username);
      } catch (error) {
        console.log(
          "Home screen Error fetching username from AsyncStorage:",
          error
        );
      }
    };
    handleUserName();
  }, []);

  useEffect(() => {
    if (isNewRecordLoading === LOADING.FULFILLED) {
      Toast.show({
        title: newRecordData?.message,
        placement: "top",
        duration: 3000,
      });
      dispatch(resetNewRecordLoadingState());
    }
    if (isNewRecordLoading === LOADING.REJECTED) {
      Toast.show({
        title: newRecordError,
        placement: "top",
        duration: 3000,
      });
    }
  }, [isNewRecordLoading]);

  const handleCreateNewRecord = () => {
    const currentDayData = data.currentDay;
    const { mintemp, maxtemp, wind } = currentDayData.recordData;
    const params = {
      mintemp,
      maxtemp,
      wind,
      description,
      weatherData: currentDayData.weatherData,
    };
    console.log(
      "\x1b[31mGönderilen Parametreler Home Screen (params):\x1b[0m",
      JSON.stringify(params, null, 2)
    );
    dispatch(postNewRecord(params));
  };

  const handleSignOut = async () => {
    try {
      await removeToken();
      dispatch(setIsAuth(false));
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Box
        mt="4"
        flexDir="row"
        justifyContent="space-around"
        w="90%"
        alignSelf="center"
      >
        <ScreenTitle title={`Hey ${userName}, nice to meet you!`} />
        <ButtonIcon
          handleClick={handleSignOut}
          iconPath={require("../assets/icons/logOutIcon.png")}
        />
      </Box>

      {error || locationError ? (
        <ErrorSection errorText={error || locationError} />
      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          enabled
        >
          <ScrollView keyboardShouldPersistTaps="handled">
            <Box flexDir="row" mt="3">
              <Text style={styles.subtitleText}>
                {`Today is ${moment(new Date()).format("MMM Do")},`}
              </Text>
              {isLoading === LOADING.FULFILLED && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Forecast", data?.forecast)
                  }
                >
                  <Text style={styles.buttonText}>Check next days!</Text>
                </TouchableOpacity>
              )}
            </Box>
            <View style={styles.middleSection}>
              {isLoading === LOADING.FULFILLED ? (
                <View style={{ marginRight: 3 }}>
                  <WeatherSection weatherData={data?.currentDay.weatherData} />
                  <DetailsSection detailsData={data?.currentDay.details} />
                </View>
              ) : (
                <SkeletonLoader />
              )}
              <View style={{ flex: 1 }}>
                <Image
                  source={require("../assets/placeHolderImg2.png")}
                  style={{
                    width: "100%",
                    height: calculatedHeight,
                    resizeMode: "contain",
                  }}
                  onLoad={handleOnLoad}
                  onError={(error) =>
                    console.error("Resim yükleme hatası:", error)
                  }
                />
              </View>
            </View>

            <Box mt="4">
              <Text style={styles.subtitleText}>What do you wear today?</Text>
              <TextArea
                mt="4"
                value={description}
                onChangeText={(text) => setDescription(text)}
                placeholder="Do you want to remember later in what clothes it was comfortable in this weather? Fill out this form!"
                w="85%"
                alignSelf="center"
                rounded="15"
                totalLines={4}
                fontSize="15"
                color="white"
                backgroundColor="primary.200"
              />
            </Box>
          </ScrollView>

          <Box flexDir="row" justifyContent="space-around" pt="5">
            <ButtonIcon
              disabled={isLoading !== LOADING.FULFILLED || error}
              handleClick={() => navigation.navigate("List")}
              iconPath={require("../assets/icons/listIcon.png")}
            />
            <ButtonIcon
              disabled={isLoading !== LOADING.FULFILLED || error}
              handleClick={() => navigation.navigate("Camera", description)}
              iconPath={require("../assets/icons/cameraIcon.png")}
            />
            {isNewRecordLoading === LOADING.PENDING ? (
              <Spinner color="primary.100" size="lg" />
            ) : (
              <ButtonIcon
                disabled={
                  isLoading !== LOADING.FULFILLED || error || !description
                }
                handleClick={handleCreateNewRecord}
                iconPath={require("../assets/icons/saveIcon.png")}
              />
            )}
          </Box>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282B34",
  },
  middleSection: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "flex-start", // Elemanları sola yaslar
    alignItems: "flex-start", // dikeyde en üste hizalar
  },
  subtitleText: {
    color: "grey",
    fontSize: 20,
    paddingLeft: "10%",
    paddingRight: "3%",
    paddingTop: "2%",
  },
  buttonText: {
    color: "grey",
    fontSize: 20,
    paddingTop: "2%",
    textDecorationLine: "underline",
  },
});

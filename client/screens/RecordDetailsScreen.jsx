import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import ScreenTitle from "../components/ScreenTitle";
import { useEffect, useRef, useState } from "react";
import { getUserName } from "../services/apiClient";
import {
  AlertDialog,
  Box,
  Button,
  Image,
  Skeleton,
  Spinner,
  Text,
  Toast,
} from "native-base";
import moment from "moment";
import ButtonIcon from "../components/ButtonIcon";
import { useNavigation, useRoute } from "@react-navigation/native";
import WeatherSection from "../components/weather/WeatherSection";
import { BASE_IMG_URL, LOADING } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  removeRecord,
  resetRemoveRecordLoadingState,
  selectRemoveRecordData,
} from "../redux/recordReducer";

const RecordDetailsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isLoading, data, error } = useSelector(selectRemoveRecordData);

  const { weatherData, description, imgsrc, _id, date } = useRoute().params;
  console.log("Record Detail image " + BASE_IMG_URL + imgsrc);

  const [userName, setUserName] = useState("friend");
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [isImgLoading, setIsImgLoading] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const toggleImgLoading = () => setIsImgLoading(!isImgLoading);
  const togglePreviewLoaded = () => setIsPreviewLoading(!isPreviewLoading);

  const toggleAlert = () => setIsOpen(!isOpen);

  const cancelRef = useRef(null);

  const togglePreview = () => setIsPreviewMode(!isPreviewMode);

  useEffect(() => {
    const handleUserName = async () => {
      try {
        setUserName(await getUserName());
      } catch (error) {
        console.log(
          "Record Detail Screen Error fetching username from AsyncStorage:",
          error
        );
      }
    };
    handleUserName();
  }, []);

  useEffect(() => {
    if (isLoading === LOADING.FULFILLED) {
      Toast.show({
        title: data,
        placement: "top",
        duration: 3000,
      });
      navigation.navigate("Home");
    }
    if (isLoading === LOADING.REJECTED) {
      Toast.show({
        title: error,
        placement: "top",
        duration: 3000,
      });
    }

    dispatch(resetRemoveRecordLoadingState());
  }, [isLoading]);

  const renderPreview = () => {
    return (
      <TouchableOpacity onPress={togglePreview}>
        <Box
          alignSelf="center"
          rounded="15"
          p="3"
          mt="3"
          w="100%"
          bg="primary.200"
          shadow={9}
          shadowOffset={{ width: 0, height: 0 }}
          shadowOpacity={0.3}
          shadowRadius={4}
          justifyContent="center"
        >
          {isPreviewLoading && (
            <Skeleton
              position="absolute"
              alignSelf="center"
              w="100%"
              h="500"
              rounded="20"
              startColor="primary.150"
            />
          )}
          <Image
            alignSelf="center"
            w="100%"
            h="500"
            rounded="20"
            source={{ uri: BASE_IMG_URL + imgsrc }}
            fallbackSource={require("../assets/icons/imgAltIcon.png")}
            alt="Image not found"
            onLoadStart={togglePreviewLoaded}
            onLoadEnd={togglePreviewLoaded}
          />
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle title={`Hey, ${userName}! Nasilsin?`} />
      <Text pt="4" color="primary.100" fontSize="20" textAlign="center">
        {`Bugün ${moment(date).format("MMM, Do")}`}
      </Text>
      {isPreviewMode ? (
        renderPreview()
      ) : (
        <View style={styles.middleSection}>
          <View style={styles.infoSection}>
            <WeatherSection weatherData={weatherData} />
            <Text mt="2" color="primary.50" fontSize="18">
              Bu havada ne giysem!!!:
            </Text>
            <Box
              mt="2"
              alignSelf="center"
              rounded="15"
              p="3"
              bg="primary.200"
              shadow={9}
              shadowOffset={{ width: 0, height: 0 }}
              shadowOpacity={0.3}
              shadowRadius={4}
            >
              <Text textAlign="center" color="primary.50" fontSize="17">
                {description || "Bu kayitta ne giyeceginizi eklememissiniz"}
              </Text>
            </Box>
          </View>
          <TouchableOpacity onPress={togglePreview}>
            {isImgLoading && (
              <Skeleton
                position="absolute"
                w="175"
                h="100%"
                rounded="20"
                startColor="primary.200"
              />
            )}

            <Image
              w="175"
              h="100%"
              rounded="10"
              source={
                !imgsrc?.length
                  ? require("../assets/placeHolderImg2.png")
                  : { uri: BASE_IMG_URL + imgsrc }
              }
              fallbackSource={require("../assets/placeHolderImg2.png")}
              alt="Image not found"
              onLoadStart={toggleImgLoading}
              onLoadEnd={toggleImgLoading}
            />
          </TouchableOpacity>
        </View>
      )}

      <Box flexDir="row" justifyContent="space-around" mt="9" pt="10">
        <ButtonIcon
          handleClick={() => navigation.navigate("List")}
          iconPath={require("../assets/icons/backIcon.png")}
        />
        <ButtonIcon
          handleClick={() => navigation.navigate("Home")}
          iconPath={require("../assets/icons/homeIcon.png")}
        />
        {isLoading === LOADING.PENDING ? (
          <Spinner color="primary.100" size="lg" />
        ) : (
          <ButtonIcon
            handleClick={toggleAlert}
            iconPath={require("../assets/icons/deleteIcon.png")}
          />
        )}
      </Box>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={toggleAlert}
      >
        <AlertDialog.Content color="primary.150">
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Kayit Silme</AlertDialog.Header>
          <AlertDialog.Body>
            Kayiti Siliyorsunuz, bu geri döndürülemez! Emin misin?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={toggleAlert}
                ref={cancelRef}
              >
                Iptal
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  toggleAlert();
                  dispatch(removeRecord(_id));
                }}
              >
                Sil gitsin
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282B34",
  },
  middleSection: {
    marginTop: 10,
    height: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  infoSection: {
    width: "50%",
  },
});

export default RecordDetailsScreen;

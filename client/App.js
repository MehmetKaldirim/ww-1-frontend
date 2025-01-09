import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultScreen from "./screens/DefaultScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import { NativeBaseProvider, Toast } from "native-base";
import HomeScreen from "./screens/HomeScreen";
import theme from "./theme/theme";
import ForecastScreen from "./screens/ForecastScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import CameraScreen from "./screens/CameraScreen";
import RecordListScreen from "./screens/RecordListScreen";
import RecordDetailsScreen from "./screens/RecordDetailsScreen";
import { useEffect } from "react";
import { selectUserData, validateToken } from "./redux/userReducer";

const AuthStack = createNativeStackNavigator();
const AuthFlow = () => (
  <AuthStack.Navigator
    initialRouteName="SignIn"
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

const AppStack = createNativeStackNavigator();
const AppFlow = () => (
  <AuthStack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <AppStack.Screen name="Home" component={HomeScreen} />
    <AppStack.Screen name="Forecast" component={ForecastScreen} />
    <AppStack.Screen name="Camera" component={CameraScreen} />
    <AppStack.Screen name="List" component={RecordListScreen} />
    <AppStack.Screen name="Details" component={RecordDetailsScreen} />
  </AuthStack.Navigator>
);

const RootStack = createNativeStackNavigator();
const RootFlow = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(selectUserData);

  useEffect(() => {
    dispatch(validateToken());
  }, [isAuth]);

  if (isAuth === null) {
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Default" component={DefaultScreen} />
      </RootStack.Navigator>
    );
  }

  return (
    <RootStack.Navigator>
      {isAuth ? (
        <RootStack.Screen
          name="AppStack"
          component={AppFlow}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="AuthStack"
          component={AuthFlow}
          options={{
            headerShown: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <RootFlow />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;

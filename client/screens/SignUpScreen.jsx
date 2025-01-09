import { Image, StyleSheet, Text, View } from "react-native";
import AuthForm from "../components/AuthForm";
import { signUp } from "../services/authService";
import { Button, Toast } from "native-base";

export default SignUpScreen = ({ navigation }) => {
  const handleSubmit = async (values) => {
    await signUp(values)
      .then((response) => {
        if (response.status === 201) {
          navigation.navigate("SignIn");
        }
      })
      .catch((error) => {
        Toast.show({
          title: error.response.data.message,
          placement: "top",
          duration: 3000,
        });
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logoIcon.png")} />
      <AuthForm handleSubmit={handleSubmit} type="SignUp" />
      <Text style={styles.text}>In you already have an account, please</Text>
      <Button
        mt="5"
        alignSelf="center"
        w="35%"
        rounded="full"
        onPress={() => navigation.navigate("SignIn")}
      >
        go to Sign In
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282B34",
  },
  logo: {
    alignSelf: "flex-end",
  },
  text: {
    color: "gray",
    textAlign: "center",
  },
});

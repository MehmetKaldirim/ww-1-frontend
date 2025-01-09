import { StyleSheet } from "react-native";
import { View } from "react-native"


const Container = (prop) => {
    return(
        <View styles={styles.container}>
            {/* {prop.child} */}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282B34'
    }
});

export default Container;

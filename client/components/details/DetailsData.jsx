import { Box } from "native-base";
import { StyleSheet } from "react-native";
import { Text } from "react-native";



const DetailsData = ({ name, value }) => {
    return (
        <Box flexDir='row' alignSelf="center">
            <Text style={styles.detailTextName} > {name}: </Text>
            <Text style={styles.detailTextValue} > {value} </Text>
        </Box>
    );
};

const styles = StyleSheet.create({
    detailTextName: {
        color: 'white',
        fontWeight: '700',
        fontSize: 15,
        alignSelf: 'center'
    },
    detailTextValue: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: '300',
    }
});

export default DetailsData;
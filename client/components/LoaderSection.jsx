import { Box, Image, Spinner, Text } from "native-base";
import { StyleSheet, View } from "react-native";


const LoaderSection = ({ text, gifLogo }) => {
    return (
        <View style={styles.container}>
            <Box
                alignSelf="center"
                rounded='15'
                p='10'
                w='60%'
                mt='30%'
                bg="primary.200"
                shadow={9}
                shadowOffset={{ width: 0, height: 0 }}
                shadowOpacity={0.3}
                shadowRadius={4}
            >
                {
                    gifLogo ?
                        <Image
                            w='100'
                            h='100'
                            rounded='100'
                            alignSelf='center'
                            source={require('../assets/icons/aLogo.gif')}
                            alt="Loading Icon"

                        /> :
                        <Spinner alignSelf='center' size='lg' color='primary.100' />
                }
                <Text
                    fontSize='lg'
                    fontWeight='500'
                    textAlign='center'
                    color='primary.50'
                    mt='10'
                >
                    {text}
                </Text>
            </Box>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282B34'
    }
});

export default LoaderSection;
import { SafeAreaView, Image, StyleSheet, View } from "react-native";
import { Box } from 'native-base';
import ButtonIcon from "./ButtonIcon";




const PhotoPreviewSection = ({ photo, 
    handleRetakePhoto, 
    handleCreateNewRecordWithPhoto, 
    navigation }) => {
    return (

        <SafeAreaView style={styles.container}>
            <Box
                alignSelf="center"
                rounded='15'
                p='1'
                w='100%'
                bg="primary.200"
                shadow={9}
                shadowOffset={{ width: 0, height: 0 }}
                shadowOpacity={0.3}
                shadowRadius={4}
                justifyContent='center'
            >
                <Image
                    style={styles.previewContainer}
                    source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
                />
            </Box>

            <Box mt='4%' mb='5%' flexDir='row' justifyContent='space-around' >
                <ButtonIcon handleClick={() => navigation.navigate('Home')} iconPath={require('../assets/icons/homeIcon.png')} />
                <ButtonIcon handleClick={handleRetakePhoto} iconPath={require('../assets/icons/reCameraIcon.png')} />
                <ButtonIcon handleClick={handleCreateNewRecordWithPhoto} iconPath={require('../assets/icons/saveIcon.png')} />
            </Box>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282B34'
    },
    previewContainer: {
        width: '100%',
        height: '90%',
        borderRadius: 20
    },
})

export default PhotoPreviewSection;
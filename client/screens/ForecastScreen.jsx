import { SafeAreaView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Box, FlatList } from 'native-base';
import ScreenTitle from '../components/ScreenTitle';
import WeatherSection from '../components/weather/WeatherSection';
import SectionTitle from '../components/weather/SectionTitle';
import ButtonIcon from '../components/ButtonIcon';

const ForecastScreen = ({ navigation }) => {

    const forecastData = useRoute().params;

    return (
        <SafeAreaView style={styles.container}>
            <ScreenTitle title='Forecast for next  four days:' />

            <FlatList
                data={forecastData}
                renderItem={({ item }) => {
                    return (
                        <Box  m='3' w='60%' alignSelf='center' >
                            <SectionTitle date={item.date} />
                            <WeatherSection weatherData={item.data} />
                        </Box>
                    )
                }}
                numColumns='1'
            />


            <Box alignSelf='center' mb='7%'  >
                <ButtonIcon handleClick={() => navigation.navigate('Home')} iconPath={require('../assets/icons/homeIcon.png')} />
            </Box>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282B34'
    }
});

export default ForecastScreen;
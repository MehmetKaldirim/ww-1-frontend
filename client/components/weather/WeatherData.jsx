import { Box } from 'native-base';
import { Image, StyleSheet, Text } from 'react-native';
import addWeatherIcon, { iconsPaths } from '../../utils/addWeatherIcon';
import { weatherIconsDictionary } from '../../constants';


const WeatherData = ({ time, temp, wind, icon }) => {

    return (
        <Box bgColor='#313135' pl='1' pr='3' mt='2' rounded='20'>
            <Text style={styles.weatherText}>
                {time}
            </Text>
            <Box flexDir='row' justifyContent='space-between'>
                <Image style={styles.weatherIcon} source={weatherIconsDictionary[icon]} />
                <Text style={styles.weatherText}>
                    {temp}°C
                </Text>
                <Image style={styles.weatherIcon} source={require('../../assets/icons/windIcon.png')} />
                <Text style={styles.weatherText}>
                    {wind}m/h
                </Text>
            </Box>
        </Box>
    );
};

const styles = StyleSheet.create({

    weatherText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center'
    },
    weatherIcon: {
        width: 30,
        height: 30,
    }
});

export default WeatherData;
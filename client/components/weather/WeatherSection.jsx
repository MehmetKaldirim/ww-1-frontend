import { Box, FlatList } from "native-base";
import React from "react";
import WeatherData from "./WeatherData";

const WeatherSection = ({weatherData}) => {
    return (
        <Box
            alignSelf="center"
            rounded='15'
            p='2'
            w='100%'
            bg="primary.200"
            shadow={9}
            shadowOffset={{ width: 0, height: 0 }}
            shadowOpacity={0.3}
            shadowRadius={4}
        >
            <FlatList
                data={weatherData}
                renderItem={({item}) => {
                    return (
                        <WeatherData time={item.time} temp={item.temp} wind={item.wind} icon={item.icon} />
                    )
                }}
                scrollEnabled={false}
            />
        </Box>
    );
};

export default WeatherSection;
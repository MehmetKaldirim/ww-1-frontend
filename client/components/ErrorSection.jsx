import React from "react";
import { Box } from "native-base";
import { Image, StyleSheet, Text } from "react-native";



const ErrorSection = ({ errorText }) => {
    const defaultText = 'Sorry, something went wrong, please try again or contact support team!';

    const truncateString = (string, maxLength) => {
        if (string.length > maxLength) {
            return string?.substring(0, maxLength - 3) + "...";
        }
        return string;
    };

    return (
        <Box
            m='5'
            w='90%'
            h='50%'
            alignItems='center'
            rounded='30'
            alignSelf='center'
            bgColor='primary.200'
        >
            <Box
                rounded='20'
                m='5'
                bgColor='primary.150'
            >
                <Image style={styles.errorIcon} source={require('../assets/icons/errorIcon.png')} />

            </Box>
            <Box
                rounded='20'
                m='5'
                _text={{
                    fontSize: "20",
                    fontWeight: "light",
                    color: "primary.50",
                    textAlign: 'center',
                    paddingX: '5',
                    margin: '5',
                    letterSpacing: "lg",
                    alignSelf: 'center'
                }}
                bgColor='primary.150'
            >
                {truncateString((errorText || defaultText), 100)}

            </Box>
            <Box
                rounded='20'
                m='5'
                _text={{
                    fontSize: "15",
                    fontWeight: "light",
                    color: "primary.50",
                    textAlign: 'center',
                    paddingX: '2',
                    alignSelf: 'center'
                }}
                bgColor='primary.150'
            >
                Contact: support@stskdrv.dev
            </Box>

        </Box>
    )
};


const styles = StyleSheet.create({
    errorIcon: {
        height: 100,
        width: 100,
        margin: 5,
    },
});

export default ErrorSection;
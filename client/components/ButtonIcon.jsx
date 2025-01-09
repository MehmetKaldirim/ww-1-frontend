import React from 'react';
import { StyleSheet } from 'react-native';
import { Image, TouchableOpacity } from 'react-native';


const ButtonIcon = ({ handleClick, iconPath, disabled }) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={handleClick}>
            <Image
                source={iconPath}
            />
        </TouchableOpacity>
    )
};



export default ButtonIcon;
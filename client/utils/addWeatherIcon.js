

export const iconsPaths = {
    '1': '../../assets/icons/weatherIcons/1.png',
};


const addWeatherIcon = (iconNum) => {
    const iconPathKey = iconNum.toString();
    const iconPath = `../../assets/icons/weatherIcons/${iconNum}.png`;

    if (!iconsPaths.hasOwnProperty(iconPathKey)) {
        iconsPaths[iconPathKey] = `${iconPath}`;
    }

};

export default addWeatherIcon;
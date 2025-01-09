import { Box } from "native-base";
import React from "react";


const ScreenTitle = ({ title }) => {
    return (
        <Box
            alignSelf="center"
            rounded='15'
            p='2'
            w='85%'
            _text={{
                fontSize: "21",
                fontWeight: "light",
                color: "primary.50",
                letterSpacing: "lg",
                alignSelf: 'center'
            }}
            bg="primary.200"
        >
            {title}
        </Box>
    );
};

export default ScreenTitle;
import React from "react";
import { Box } from "native-base";


const SectionTitle = ({ date }) => {
    return (
        <Box
            bgColor='primary.50'
            w='60%'
            h='35'
            mb='-1.5'
            zIndex='2'
            alignSelf='center'
            rounded='full'
            p='1'
            _text={{
                fontSize: "17",
                fontWeight: "medium",
                color: "primary.150",
                letterSpacing: "lg",
                alignSelf: 'center'
            }}
        >
            {date}
        </Box>
    );
};

export default SectionTitle;
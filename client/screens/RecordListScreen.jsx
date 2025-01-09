import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ScreenTitle from "../components/ScreenTitle";
import RecordItem from "../components/RecordItem";
import { Box } from "native-base";
import ButtonIcon from "../components/ButtonIcon";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecords, selectAllRecordsData } from "../redux/recordReducer";
import { LOADING } from "../constants";
import SkeletonLoader from "../components/SceletonLoader";
import ErrorSection from "../components/ErrorSection";



const RecordListScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const { data, isLoading, error } = useSelector(selectAllRecordsData);

    useEffect(() => {
        dispatch(fetchAllRecords());
    }, []);

    const renderRecords = () => {
        if (isLoading === LOADING.PENDING) {
            return <SkeletonLoader type="list" />;
          } else if (isLoading === LOADING.REJECTED) {
            return <ErrorSection errorText={error} />;
          } else if (isLoading === LOADING.FULFILLED) {
            return data.map((el) => (
              <RecordItem key={el._id} recordData={el} />
            ));
          }
          return null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScreenTitle title='Here are all your records:' />
            {renderRecords()}
            <Box position='absolute' alignSelf='center' bottom='5'>
                <ButtonIcon handleClick={() => navigation.navigate('Home')} iconPath={require('../assets/icons/homeIcon.png')} />
            </Box>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282B34'
    },
});



export default RecordListScreen;
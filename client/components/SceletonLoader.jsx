import React from "react";
import { Skeleton, VStack, Text } from "native-base";

const SkeletonLoader = ({type}) => {


  if (type === 'list') {
    return <VStack w='85%' alignSelf='center'>
      <Text 
        mt='3' 
        alignSelf='center' 
        color='primary.50'
        fontSize="15"
        fontWeight='500'
      > 
        Records are loading ...
      </Text>
      <Skeleton mt='5' h="10" rounded='30%' startColor="primary.200" />
      <Skeleton mt='5' h="10" rounded='30%' startColor="primary.200" />
      <Skeleton mt='5' h="10" rounded='30%' startColor="primary.200" />
      <Skeleton mt='5' h="10" rounded='30%' startColor="primary.200" />
      <Skeleton mt='5' h="10" rounded='30%' startColor="primary.200" />
      <Skeleton mt='5' h="10" rounded='30%' startColor="primary.200" />
  </VStack>;
  }


  return <VStack w='55%'>
      <Skeleton h="230" rounded="20" startColor="primary.200" />
      <Text 
        mt='3' 
        alignSelf='center' 
        color='primary.50'
        fontSize="15"
        fontWeight='500'
      > 
        Weather is loading ...
      </Text>
      <Skeleton mt='3' h="120" rounded="20" startColor="primary.200" />
  </VStack>;
};

export default SkeletonLoader;
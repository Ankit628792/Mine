import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { colors } from '../../utils/colors';
import tw from 'twrnc'

const circleContainerSize = 50;

const AnimatedCircle = ({ circleX }) => {
    const circleContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: circleX.value - circleContainerSize / 2 }],
        };
    }, []);

    return <Animated.View style={[tw`shadow-lg shadow-purple-400`, circleContainerStyle, styles.container,]} />;
};

export default AnimatedCircle;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: -circleContainerSize / 1.8,
        width: circleContainerSize,
        borderRadius: circleContainerSize,
        height: circleContainerSize,
        backgroundColor: colors.purple, // button background
        // backgroundColor: 'rgb(225, 29, 72)', // button background
        justifyContent: 'center',
        alignItems: 'center',
    },
});
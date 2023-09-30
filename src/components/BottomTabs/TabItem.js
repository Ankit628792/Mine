import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';
import React, { FC, useEffect } from 'react';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import usePath from '../../hooks/usePath';
import tw from 'twrnc'
import { Path, Svg } from 'react-native-svg';
import { colors } from '../../utils/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

const getPathXCenterByIndex = (tabPaths, index) => {
  const curves = tabPaths[index].curves;
  const startPoint = curves[0].to;
  const endPoint = curves[curves.length - 1].to;
  const centerX = (startPoint.x + endPoint.x) / 2;
  return centerX;
};

const ICON_SIZE = 25;
const LABEL_WIDTH = SCREEN_WIDTH / 5;

const TabItem = ({ label, index, activeIndex, onTabPress, activeRoute }) => {
  const { curvedPaths } = usePath();
  const animatedActiveIndex = useSharedValue(activeIndex);
  const iconPosition = getPathXCenterByIndex(curvedPaths, index);
  const labelPosition = getPathXCenterByIndex(curvedPaths, index);

  const tabStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value - 1 === index ? -16 : 20;
    const iconPositionX = iconPosition - index * ICON_SIZE;
    return {
      width: ICON_SIZE,
      height: ICON_SIZE,
      transform: [
        { translateY: withTiming(translateY) },
        { translateX: iconPositionX - ICON_SIZE / 2 },
      ],
    };
  });
  const labelContainerStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value - 1 === index ? 36 : 100;
    return {
      transform: [
        { translateY: withTiming(translateY) },
        { translateX: labelPosition - LABEL_WIDTH / 2 },
      ],
    };
  });
  const iconColor = useSharedValue(
    activeIndex === index + 1 ? 'white' : 'rgba(128,128,128,0.8)',
  );

  //Adjust Icon color for this first render
  useEffect(() => {
    animatedActiveIndex.value = activeIndex;
    if (activeIndex === index + 1) {
      iconColor.value = withTiming('white');
    } else {
      iconColor.value = withTiming('rgba(128,128,128,0.8)');
    }
  }, [activeIndex]);

  const selectIcon = (routeName, color, activeRoute) => {
    switch (routeName) {
      case 'Home':
        return <Svg xmlns="http://www.w3.org/2000/svg" fill={activeRoute ? '#fff' : "none"} viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" style={{ color: color, width: ICON_SIZE, height: ICON_SIZE }}>
          <Path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </Svg>
      case 'Likes':

        return <Svg xmlns="http://www.w3.org/2000/svg" fill={activeRoute ? '#fff' : "none"} viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" style={{ color: color, width: ICON_SIZE, height: ICON_SIZE }}>
          <Path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </Svg>

      case 'Chat':
        return <Svg xmlns="http://www.w3.org/2000/svg" fill={activeRoute ? '#fff' : "none"} viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" style={{ color: color, width: ICON_SIZE, height: ICON_SIZE }}>
          <Path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </Svg>

      case 'Matches':
        return <Svg xmlns="http://www.w3.org/2000/svg" fill={activeRoute ? '#fff' : "none"} viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" style={{ color: color, width: ICON_SIZE, height: ICON_SIZE }}>
          <Path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </Svg>

      case 'Profile':
        return <Svg xmlns="http://www.w3.org/2000/svg" fill={activeRoute ? '#fff' : "none"} viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" style={{ color: color, width: ICON_SIZE, height: ICON_SIZE }}>
          <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </Svg>

      default:
        return <Svg xmlns="http://www.w3.org/2000/svg" fill={activeRoute ? '#fff' : "none"} viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" style={{ color: color, width: ICON_SIZE, height: ICON_SIZE }}>
          <Path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </Svg>
    }
  };
  return (
    <>
      <Animated.View style={[tabStyle]}>
        <Pressable
          testID={`tab${label}`}
          hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
          onPress={onTabPress}>
          {selectIcon(label, (activeRoute == label) ? colors.purple : 'rgba(128,128,128,0.8)', (activeRoute == label))}
        </Pressable>
      </Animated.View>
      <Animated.View style={[labelContainerStyle, styles.labelContainer]}>
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
    </>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: LABEL_WIDTH,
  },
  label: {
    color: colors.purple, // text color
    // color: '#FF5F6D', // text color
    // color: 'rgb(225, 29, 72)', // text color
    fontSize: 14,
  },
});

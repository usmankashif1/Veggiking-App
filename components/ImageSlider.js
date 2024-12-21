import React, { useRef, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView, Animated } from 'react-native';
import { COLORS, images } from '../constants';

const { width } = Dimensions.get('window');

const sliderImages = [
 images.restaurants,
  images.restaurants,
  images.restaurants,
  images.restaurants,
  images.restaurants,
  images.restaurants,
  images.restaurants,
];

const ImageSlider = () => {
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = event => {
    const page = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(page);
  };

  const scrollToPage = page => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: page * width, animated: true });
      setCurrentPage(page);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {sliderImages.map((imageUrl, index) => (
          <View key={index} style={styles.slide}>
            <Image source={imageUrl} style={styles.image} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {sliderImages.map((_, index) => (
          <View
            key={index}
            style={[styles.paginationDot, index === currentPage && styles.activeDot]}
            onTouchEnd={() => scrollToPage(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   height: 321,
   width: width
  },
  slide: {
    width,
    height: '100%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    height: 321,
    width: width,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32
  },
  pagination: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.white,
  },
});

export default ImageSlider;

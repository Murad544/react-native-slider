import { Image } from 'expo-image';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  SafeAreaView,
} from 'react-native';
import { ImageObj } from './MainPage';

const windowWidth = Dimensions.get('window').width;
const imageWidth = windowWidth * 0.75; // Adjust the width of the images
const containerHorizontalPadding = 20; // Adjust the padding of the images

interface Props {
  images: ImageObj[];
  imageMargin?: number;
  autoPlayInterval?: number;
}

const ImageSlider = ({ images, imageMargin = 0, autoPlayInterval }: Props) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const imageOffsets = images?.map((image, index) => {
    return (imageWidth + imageMargin * 2) * index;
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(
      (scrollX + (windowWidth - imageWidth) / 2 + imageMargin) /
        (imageWidth + imageMargin * 2),
    );
    setActiveIndex(index);
  };

  // Auto scroll
  useEffect(() => {
    const interval =
      autoPlayInterval &&
      setInterval(() => {
        if (activeIndex === images.length - 1) {
          setActiveIndex(0);
          scrollViewRef?.current?.scrollTo({ x: 0, y: 0, animated: true });
        } else {
          setActiveIndex(activeIndex + 1);
          scrollViewRef?.current?.scrollTo({
            x: imageOffsets[activeIndex + 1],
            y: 0,
            animated: true,
          });
        }
      }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [activeIndex, imageMargin]);

  const renderImages = images.map((image, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        setActiveIndex(index);
        setActiveImage(image.download_url);
      }}
    >
      <Image
        source={{ uri: image.download_url }}
        style={{ ...styles.imageStyle, marginHorizontal: imageMargin }}
      />
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        snapToInterval={imageWidth + imageMargin * 2 + 0.25}
        contentContainerStyle={{
          paddingHorizontal:
            (windowWidth - imageWidth) / 2 -
            imageMargin -
            containerHorizontalPadding,
        }}
        decelerationRate='fast'
        style={styles.scrollViewStyle}
        pagingEnabled
      >
        {renderImages}
      </ScrollView>

      <Modal
        animationType='slide'
        transparent={false}
        visible={activeImage ? true : false}
        onRequestClose={() => setActiveImage(null)}
      >
        <SafeAreaView style={styles.modalView}>
          <Image
            source={{ uri: activeImage ?? '' }}
            contentFit='contain'
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#0553',
            }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setActiveImage(null)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    paddingHorizontal: containerHorizontalPadding,
  },
  scrollViewStyle: {
    borderRadius: 10,
    height: 200,
    flexGrow: 0,
    // Additional styles if needed
  },
  imageStyle: {
    width: imageWidth,
    height: 200,
    borderRadius: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: 70,
    right: 30,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default ImageSlider;

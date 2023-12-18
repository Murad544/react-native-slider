import React from 'react';
import ImageSlider from './ImageSlider';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface ImageObj {
  author: string;
  download_url: string;
  height: number;
  id: string;
  url: string;
  width: number;
}

const getImages = async () => {
  try {
    const response = await axios.get(
      'https://picsum.photos/v2/list?page=2&limit=20',
    );
    return response.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

const MainPage = () => {
  const { data }: UseQueryResult<any, unknown> = useQuery({
    queryKey: ['images'],
    queryFn: () => getImages(),
  });
  return (
    data && (
      <ImageSlider images={data} autoPlayInterval={3000} imageMargin={10} />
    )
  );
};

export default MainPage;

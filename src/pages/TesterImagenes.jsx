import React, { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const ImageGallery = () => {

const filenames = [
  'admin@mail.com-udpLogo.jpg',
  'udpLogo.jpg',
  'test2.jpg'
  // Add your filenames here
];
  const [imageUrls, setImageUrls] = useState([]);
  const storage = getStorage();

  useEffect(() => {
    const loadImages = async () => {
      const urls = await Promise.all(filenames.map(async (filename) => {
        const imageRef = ref(storage, `files/${filename}`);
        return await getDownloadURL(imageRef);
      }));
      setImageUrls(urls);
    };

    loadImages();
  }, [filenames, storage]);

  return (
    <div>
      {imageUrls.map((url, index) => (
        <img key={index} src={url} alt={`Image ${index}`} style={{ width: '200px', height: 'auto', margin: '10px' }} />
      ))}
    </div>
  );
};

export default ImageGallery;
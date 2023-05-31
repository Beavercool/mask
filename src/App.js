import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './app.css';
import axios from 'axios';

const DEST_URL = 'http://localhost:3000/addImage'
const SWAP_URL = 'http://localhost:3000/proc'
const RES_URL = 'http://localhost:3000/res/'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const [collectionId] = useState(getRandomInt(1024));

  const [userImages, setUserImages] = useState([]);
  const [serverImages, setServerImages] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);

  const handleUpload = async (event) => {
    event.preventDefault()
    const files = Array.from(event.target.files);
    files.map(async (f) => {
      const formData = new FormData();
        formData.append('img', f)
        formData.append('collectionId', collectionId)
        const upload = await axios.post(DEST_URL, formData)

        console.log(upload);
    })

    const uploadedImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      description: '',
    }));
    setUserImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const handleSwapFaces = async () => {
    const res = await axios.post(SWAP_URL, {collectionId: collectionId})
    
    const arr = res.data
    const ares = arr.map((v) => ({
      url: RES_URL + v,
      description: '',
    }))
    setServerImages([...ares])


    // setUserImages((prevImages) => [...prevImages, ...uploadedImages]);

    console.log('Swap Faces');
  };

  const handleSearch = () => {
    const filtered = userImages.filter((image) =>
      image.description.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredImages(filtered);
  };

  const displayedImages = filteredImages.length > 0 ? filteredImages : userImages;

  return (
    <div>
      <h1>BurlaMask</h1>
      <div className="search-container">
        <h2>Search</h2>
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button onClick={handleSearch}>Поиск</button>
      </div>

      <div className="carousel-container">
        <h2>Original</h2>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={3000}
          centerMode={false}
          className="carousel"
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass="carousel-item"
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {displayedImages.map((image, index) => (
            <div key={index} className="image-slide">
              <img src={image.url} alt={`User Image ${index}`} />
              <div className="image-description">
                <input
                  type="text"
                  value={image.description}
                  onChange={(e) => {
                    const updatedImages = [...displayedImages];
                    updatedImages[index].description = e.target.value;
                    setFilteredImages(updatedImages);
                  }}
                />
              </div>
            </div>
          ))}
        </Carousel>
        <input type="file" multiple onChange={handleUpload} />
      </div>

      <div className="carousel-container">
        <h2>Burlaface</h2>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={3000}
          centerMode={false}
          className="carousel"
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass="carousel-item"
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {serverImages.map((image, index) => (
            <div key={index} className="image-slide">
              <img src={image.url} alt={`Server Image ${index}`} />
              <div className="image-description">{image.description}</div>
            </div>
          ))}
        </Carousel>
        <button onClick={handleSwapFaces}>Swap Faces</button>
      </div>
    </div>
  );
};

export default App;

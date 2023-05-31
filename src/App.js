import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './app.css';

const App = () => {
  const [userImages, setUserImages] = useState([]);
  const [serverImages, setServerImages] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);

  const handleUpload = (event) => {
    const files = Array.from(event.target.files);
    const uploadedImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      description: '',
    }));
    setUserImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const handleSwapFaces = async () => {
    // Ваш код для запроса изображений с сервера NestJS и установки их в состояние serverImages
    // Пример запроса к серверу:
    // const response = await fetch('http://localhost:3000/images');
    // const data = await response.json();
    // setServerImages(data.images);
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

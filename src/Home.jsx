import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
//import "./selling.jsx";
import "./App.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const auth = useContext(AuthContext);
  let name = "";
  if (auth && auth.currentUser) {
    const { displayName, email } = auth.currentUser;
    name = displayName || email;
  }
  const carouselImages = [
    "/book1.jpg",
    "/IMG_20201115_171652.jpg",
    "/chickenlittle.jpg",
    "/IMG_20201115_171659.jpg",
  ];
  const carouselImages1 = [
    "/JustLikeMommy.jpg",
    "/itspottytime.jpg",
    "/HowWeSayILoveYou.jpg",
    "/image.png",
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <h2 className="homeheader">SMY Books and Toys</h2>
      <div className="cta-buttons">
        <NavLink to="/SellingPage" className="cta-button">
          Sell Your Items
        </NavLink>
        <NavLink to="/BuyingPage" className="cta-button">
          Explore and Buy Items
        </NavLink>
      </div>
      <div className="home-wrapper">
        <div className="home-container">
          <h3 className="about">About Us</h3>
          <p>
            This platform is created to help families sell gently used
            children's toys and books. Users can buy and sell items,
            contributing to environmental sustainability by reusing items and
            providing affordable options for families.
          </p>
          <Slider {...carouselSettings} className="carousel">
            {carouselImages.map((image, index) => (
              <div key={index} className="carousel-item">
                <img src={image} alt={`Carousel Item ${index + 1}`} />
              </div>
            ))}
          </Slider>

          <p>
            {" "}
            Our mission and goal is to make our living easier and better in
            helping the environment by reusing things.
          </p>
        </div>
        <div className="home-container1">
          <h3 className="contacts">Learn more</h3>
          <p>
            For families who want to donate for free can upload their items and
            put price free. So that the families who may need it can take it.
            This would be a win win instead of throwing away toys and books
            finding someone who may use it and whom those need toys and books in
            lower price or for free would be benefited.
          </p>
          <Slider {...carouselSettings} className="carousel">
            {carouselImages1.map((image, index) => (
              <div key={index} className="carousel-item">
                <img src={image} alt={`Carousel Item ${index + 1}`} />
              </div>
            ))}
          </Slider>

          <p> Please give us your ideas to work better on this platform.</p>
        </div>
      </div>
      <footer className="contact-us-footer">
        <div className="contact-info">
          <p>Contact Us:</p>
          <p>
            Email: <a href="mailto:tes@yahoo.com">tes@yahoo.com</a>
          </p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
        <div className="social-media">
          <p>Follow Us:</p>
          {}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          {}
        </div>
        <p>© 2023 SMY Children's Toys and Books Store</p>
      </footer>
    </>
  );
}

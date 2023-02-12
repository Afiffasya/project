import Carousel from "react-bootstrap/Carousel";

function Carousell() {
  return (
    <div
      className="caro"
      style={{ textAlign: "center", margin: "auto", width: "100vh" }}
    >
      <Carousel slide={false}>
        <Carousel.Item interval={3500}>
          <img
            className="d-block w-100"
            style={{ borderRadius: "17px" }}
            src="https://berauterkini.co.id/wp-content/uploads/2021/12/maxresdefault.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={3500}>
          <img
            className="d-block w-100"
            style={{ borderRadius: "17px" }}
            src="https://images.thedirect.com/media/article_full/doctor-strange-2-characters_VCFX7A7.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={3500}>
          <img
            className="d-block w-100"
            style={{ borderRadius: "17px" }}
            src="https://www.axn-asia.com/sites/axn-asia.com/files/ct_movie_f_primary_image/venom_let_there_be_carnage_-_keyart.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Carousell;

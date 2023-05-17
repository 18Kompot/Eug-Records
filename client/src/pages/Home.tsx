import { Carousel } from "react-bootstrap";
import Editable from "../components/Editable";
import Title from "../components/Title";

function Home() {
  const carouselItems = [
    {
      id: 1,
      image: "/images/wurecord.jpg",
      caption: "Wu tang",
    },
    {
      id: 2,
      image: "/images/atrecord.jpg",
      caption: "AT Stylus",
    },
    {
      id: 3,
      image: "/images/atprecord.jpg",
      caption: "AT Stylus2",
    },
    {
      id: 4,
      image: "/images/pexels.jpg",
      caption: "RCategory",
    },
  ];

  return (
    <>
      <div className="container mt-5 d-flex row justify-content-center">
        <Carousel className="carousel-container">
          {carouselItems.map((item) => (
            <Carousel.Item key={item.id}>
              <img
                className="carousel-image"
                src={item.image}
                alt={item.caption}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <Editable name="home">
        <Title
          main={<>Record collecting in the 21st century</>}
          sub={<>Do people still listen to vinyl records nowadays?</>}
        />
        <div className="container-fluid m-4">
          <div className="row">
            <p className="text-white align-self-center">
              As a record collector, I keep getting this question from a lot of
              people that find out about my hobby. In the past decade, vinyl
              records not only made a comeback as a valuable collection piece
              but also as a way to enjoy your favorite albums in good quality -
              almost the way the artist intended.
            </p>
            <p className="text-white align-self-center">
              Young record collectors that reveal a new way of enjoying their
              favorite music are joining the ranks of those record collectors
              that have been doing it for decades and never gave up on their
              passion for this music format. Not only that but many of the young
              and popular artists of today are releasing their music on vinyl
              records and not on one but many records - different colors,
              editions, and sizes!
            </p>
            <p className="text-white align-self-center">
              According to the Recording Industry Association of America (RIAA)
              annual revenue report, vinyl records outsold CDs in the US last
              year for the first time since 1987, selling 41 million units
              against 33 million for CD.
            </p>
            <p className="text-white align-self-center">
              As a result - the sales, manufacturing, and demand for turntables
              and record players have also increased by hundreds of percent.
            </p>
            <img
              src="./images/riaa.png"
              alt="stat"
              height="400px"
              width="400px"
            />
            <Title
              main={<></>}
              sub={
                <>
                  Why do some people prefer to spin a record and not go digital?
                </>
              }
            />
            <p className="text-white align-self-center">
              There is not always common sense or one simple explanation. Some
              do it for the value that people believe the vinyl record holds.
              Some rare records can go for a few thousand dollars, and some buy
              and wait for the value to increase over the years.
            </p>
            <p className="text-white align-self-center">
              But for many record collectors out there including myself - it's
              like a ceremony. A vinyl record sounds different, feels different,
              the sound is deeper and warmer, and cannot be compared to a
              digitally processed sound, a record you can hold in your hands and
              keep for many years.
            </p>
            <p className="text-white align-self-center">
              So if music has a special place in your heart maybe record
              collecting is something you may enjoy, having a special corner in
              your home where you can swap through your music collection, pull
              out a record, place it onto your turntable, and sit back to enjoy
              every moment of your favorite album and let the whole world wait.
            </p>
          </div>
        </div>
      </Editable>
    </>
  );
}

export default Home;

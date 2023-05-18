import { Col } from "react-bootstrap";
import Editable from "../components/Editable";

function About() {
  return (
    <Editable name="about">
      <div className="d-flex flex-column-reverse flex-sm-row">
        <Col sm={6} className="text-white">
          <div>
            <p>
              Hello and welcome to Eug Records - This site is designed to
              demonstrate my own private record collection and my musical
              equipment that I currently own as a record collector and
              enthusiast.
            </p>
          </div>
          <br />
          <div>
            <p>
              On this site I have used an API to pull information from my
              account on www.discogs.com - the biggest library/platform for
              music collectors
            </p>
          </div>
          <br />
          <div>
            <p className="fw-bold text-warning">
              To be able to access the collection page you must first register
              an account!
            </p>
          </div>
          <br />
          <div>
            <p>
              <b>On Eug Records you will be able to:</b>
            </p>
            <ul>
              <li>Browse through my personal record collection</li>
              <li>View detailed information about each release</li>
              <li>Add the releases to your cart</li>
              <li>
                A purchase button within the cart that will redirect you
                straight to the purchase page of a specific release on
                discogs.com
              </li>
              <li>
                Upon registration, you can choose to be an admin. You will then
                be able to edit the content of some pages.
              </li>
            </ul>
          </div>
          <br />
          <div>
            <p>
              I have also added links to my social media accounts at the footer
              of the site in case some of you would like to reach out to me for
              any questions or just for a conversation.
            </p>
          </div>
          <br />
          <div>
            <p className="fst-italic">
              This website was created & designed by me (Evgeny Kroitoru) as a
              final project for a Fullstack Web Development course at HackerU,
              Israel.
            </p>
          </div>
        </Col>
        <Col
          sm={6}
          className="d-flex justify-content-center align-items-start m-2"
        >
          <img
            src="/images/profilerec.jpg"
            alt="profileimg"
            style={{
              borderRadius: "50%",
              width: "100%",
              maxWidth: "450px",
              height: "450px",
              objectFit: "cover",
            }}
          />
        </Col>
      </div>
    </Editable>
  );
}

export default About;

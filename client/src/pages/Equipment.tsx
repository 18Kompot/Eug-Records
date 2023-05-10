import Editable from "../components/Editable";

function Equipment() {
  return (
    <>
      <Editable name="equipment">
        <div className="row">
            <p className="col-sm-6 text-white align-self-center">
              Hello and welcome to Eug Records - This site is designed to
              demonstrate my own private record collection and my musical equipment
              that I currently own as a record collector and enthusiast.
            </p>
          </div>
          <br />
          <div className="row">
            <p className="col-sm-6 text-white align-self-center">
              On this site I have used an API to pull information from my account on
              www.discogs.com - the biggest library/platform for music collectors
            </p>
          </div>
          <br />
          <div className="row">
            <p className="col-sm-6 fw-bold text-warning align-self-center">
              To be able to access the collection page you must register an account
              first!
            </p>
          </div>
          <br />
          <div className="row">
            <p className="col-sm-6 text-white align-self-center">
              On Eug Records you will be able to browse through my record
              collection, view detailed information about each release, add the
              releases to your cart and if you will wish to buy some of them, there
              is a purchase button within the cart that will redirect you straight
              to the purchase page of a specific release on discogs.com
            </p>
          </div>
          <br />
          <div className="row">
            <p className="col-sm-6 text-white align-self-center">
              I have also added links to my social media accounts at the footer of
              the site in case some of you would like to reach out to me for any
              questions or just for a conversation
            </p>
          </div>
          <br />
          <div className="row">
            <p className="fst-italic col-sm-6 text-white align-self-center">
              This website was created & designed by me (Evgeny Kroitoru) as a final
              project for a Fullstack Web Development course at HackerU, Israel.
            </p>
          </div>
      </Editable>
    </>
  );
}

export default Equipment;

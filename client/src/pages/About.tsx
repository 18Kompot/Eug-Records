function About() {
  return (
    <div className="text-light m-3 container">
      <p>
        Hello and welcome to Eug Records - This site is designed to demonstrate
        my own private record collection and my musical equipment that I
        currently own as a record collector and enthusiast.
      </p>
      <br />
      <p>
        On this site I have used an API to pull information from my account on
        www.discogs.com - the biggest library/platform for music collectors
      </p>
      <br />
      <p className="fw-bold text-warning">
        To be able to access the collection page you must register an account
        first!
      </p>
      <br />
      <p>
        On Eug Records you will be able to browse through my record collection,
        view detailed information about each release, add the releases to your
        cart and if you will wish to buy some of them, there is a purchase
        button within the cart that will redirect you straight to the purchase
        page of a specific release on discogs.com
      </p>
      <br />
      <p>
        I have also added links to my social media accounts at the footer of the
        site in case some of you would like to reach out to me for any questions
        or just for a conversation
      </p>
      <br />
      <p className="fst-italic">
        This website was created & designed by me (Evgeny Kroitoru) as a final
        project for a Fullstack Web Development course at HackerU, Israel.
      </p>
    </div>
  );
}

export default About;

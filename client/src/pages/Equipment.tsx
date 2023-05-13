import Editable from "../components/Editable";

function Equipment() {
  return (
    <>
      <Editable name="equipment">
        <div className="container">
          <div className="m-5">
            <h2 className="text-white text-center">My equipment</h2>
            <br />
          </div>
          <div className="row">
            <div className="m-5">
              <br />
              <h3 className="text-center text-white fw-normal mb-4">
                Sony PS-LX310BT
              </h3>
            </div>
            <p className="col-sm-6 text-white align-self-center">
              The Sony PS-LX310BT turntable is a great value — especially at the
              current price. It has everything you would want including
              automatic operation, MM cartridge, a pre-amp with variable output
              level and rock solid Bluetooth wireless streaming. Audio is
              excellent for a system of this price. Sealing the deal is a
              modern, minimalist design that packs a real visual punch and makes
              this turntable look far more expensive than it is.
            </p>
            <div className="col-sm-6">
              <img
                className="img-fluid"
                src="/images/sony.png"
                alt="turntable"
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="m-5">
              <br />
              <h3 className="text-center text-white fw-normal mb-4">
                Ampapa A1 Preamp
              </h3>
            </div>
            <p className="col-sm-6 text-white align-self-center">
              Ampapa A1, more than one simple preamp: MM input, converts phono
              signal to line level signal, with low-noise integrated circuits
              and high-quality components to ensure clear and clean sound.
              Stereo RCA input, amplifies the low level audio signal from your
              phone, tablet, PC, MP3 etc., easier to drive amplifiers or active
              speakers and greatly improve the sound quality. <br />
              <br />
              JAN5654 tubes and HiFi vintage analog sound: reveal a sound that
              is both warm and fine, highlight great musicality, and improve
              everything associated with music such as detail, transparency,
              immediacy, richness, dynamic, tone etc.. Ceramic silver-plated
              pluggable tube socket for tube rolling and sound-shaping, easy to
              replace according to one's preference. <br />
              <br />
              Tone Control and 3.5mm headphone output: get more delicate and
              smooth sound by adjusting treble / bass knob, presenting music
              with rousing highs and deep lows and rejuvenating your audio
              system. Reasonable and advanced architecture, adds classic
              headphone amp circuit (2*NE5532), easily to drive 16-300 ohm
              headphones. <br />
              <br />
              Excellent performance and amazing design: all details full of
              texture, provide different acoustic enjoyment with large dynamic
              and sweet tube sound even in limited space. Using high-quality
              components, solid aluminum alloy knobs, unique appearance modeling
              decorates with warm orange / cool green lights etc., all is for
              the best listening experience.
            </p>
            <div className="col-sm-6">
              <img
                className="img-fluid"
                src="/images/ampapa.png"
                alt="preamp"
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="m-5">
              <br />
              <h3 className="text-center text-white fw-normal mb-4">
                Klipsch The Fives
              </h3>
            </div>
            <p className="col-sm-6 text-white align-self-center">
              The Fives can immensely improve your TV's sound, easy-to-use,
              powered, high-def speakers that connect directly to your TV - and
              virtually anything else.
              <br />
              <br />
              The Fives incorporate award-winning, proprietary Klipsch Reference
              acoustic horn-loaded technology, from dedicated left and right
              speakers for a big, bold soundstage. Built-in dynamic bass
              equalization delivers powerful bass at any volume. The Fives also
              feature 192kHz/24-bit decoding for flawless reproduction of
              high-resolution audio tracks.
              <br />
              <br />
              The Fives are the first powered monitors on the market with
              HDMI-ARC to connect directly to a TV for high-resolution, discrete
              2-channel TV sound. The Fives include a phono preamp, Bluetooth®
              5, HDMI-ARC, digital optical, analog RCA and USB inputs, and a
              subwoofer output.
            </p>
            <div className="col-sm-6">
              <img
                className="img-fluid"
                src="/images/fives.png"
                alt="speakers"
              />
            </div>
          </div>
        </div>
      </Editable>
    </>
  );
}

export default Equipment;

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <p className="text-center text-white bg-secondary opacity-25 py-3 mt-auto">
        Created By Evgeny Kroitoru {year} &#169;
      </p>
    </>
  );
}

export default Footer;

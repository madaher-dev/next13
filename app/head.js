import PropTypes from "prop-types";
// import theme from "../styles/theme";

const Head = ({ title, description, image, url, color, favicon }) => {
  // const post = await getPost(params.slug);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* <!-- Google / Search Engine Tags --> */}
      <meta itemProp="name" content={title} key="googleName" />
      <meta itemProp="description" content={description} key="googleDesc" />
      <meta itemProp="image" content={image} key="googleImg" />

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content={url} key="fbUrl" />
      <meta property="og:type" content="website" key="fbType" />
      <meta property="og:title" content={title} key="fbTitle" />
      <meta property="og:description" content={description} key="fbDesc" />
      <meta property="fb:app_id" content="643598033374179" key="fbAppID" />
      <meta property="og:image" content={image} key="fbIco" />
      <meta property="og:image:width" content="1200" key="fbIcoWidth" />
      <meta property="og:image:height" content="630" key="fbIcoHeight" />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary" key="twCard" />
      <meta name="twitter:title" content={title} key="twTitle" />
      <meta name="twitter:description" content={description} key="twDesc" />
      <meta name="twitter:image" content={image} key="twImg" />

      {/* PWA primary color */}
      <meta name="theme-color" content={color} key="pwa" />

      <link rel="shortcut icon" href={favicon} key="favicon2" />
      <link rel="icon" href={favicon} key="favicon" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        key="notch"
      />
    </>
  );
};
Head.defaultProps = {
  title: "Welcome to Lokalee",
  description:
    "Lokalee is your go-to digital concierge solution that offers you dining recommendations, exquisite experiences and attraction tickets in your city.",
  image: "https://www.lokalee.app/images/logo.png",
  url: "https://www.lokalee.app",
  color: "#BFFF38",
  favicon: "/favicon.ico",
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  color: PropTypes.string,
  favicon: PropTypes.string,
};

export default Head;

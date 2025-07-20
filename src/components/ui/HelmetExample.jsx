import { Helmet } from 'react-helmet-async';

const HelmetExample = () => (
  <Helmet>
    <title>Portfolio Ultra</title>
    <meta name="description" content="Portfolio personnel moderne avec React, Vite, Tailwind." />
    <meta property="og:title" content="Portfolio Ultra" />
    <meta property="og:description" content="Portfolio personnel moderne avec React, Vite, Tailwind." />
    <meta property="og:type" content="website" />
  </Helmet>
);

export default HelmetExample;
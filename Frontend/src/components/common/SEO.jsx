import { Helmet } from '@vuer-ai/react-helmet-async'

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  siteName = 'My Blog',
  locale = 'en_US',
  twitterHandle = '@mytwitter', 
}) {

  const absoluteUrl = url?.startsWith('http') ? url : `${import.meta.env.VITE_SITE_URL}${url}`
  const absoluteImage = image?.startsWith('http') ? image : `${import.meta.env.VITE_SITE_URL}${image}`

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {absoluteImage && <meta property="og:image" content={absoluteImage} />}
      {absoluteUrl && <meta property="og:url" content={absoluteUrl} />}
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {absoluteImage && <meta name="twitter:image" content={absoluteImage} />}
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
    </Helmet>
  )
}

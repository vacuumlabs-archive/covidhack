import {NextApiRequest, NextApiResponse} from 'next'
import {SitemapStream, streamToPromise, EnumChangefreq} from 'sitemap'
import {createGzip} from 'zlib'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!res) return {}
  try {
    res.setHeader('content-type', 'application/xml')
    res.setHeader('Content-Encoding', 'gzip')
    const smStream = new SitemapStream({
      hostname: 'https://tramatm.com',
    })

    const pipeline = smStream.pipe(createGzip())
    // Add any static entries here
    smStream.write({
      url: '/',
      changefreq: EnumChangefreq.MONTHLY,
    })
    smStream.write({
      url: '/faq',
      changefreq: EnumChangefreq.MONTHLY,
    })
    smStream.write({
      url: '/verification',
      changefreq: EnumChangefreq.MONTHLY,
    })
    smStream.write({
      url: '/gdpr',
      changefreq: EnumChangefreq.MONTHLY,
    })
    smStream.write({
      url: '/terms-and-conditions',
      changefreq: EnumChangefreq.MONTHLY,
    })
    smStream.write({
      url: '/cookies',
      changefreq: EnumChangefreq.MONTHLY,
    })
    smStream.end()
    streamToPromise(pipeline)
    pipeline.pipe(res).on('error', (e) => {
      throw e
    })
  } catch (e) {
    res.status(500).end()
  }
}

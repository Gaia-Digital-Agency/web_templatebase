import { getPayload } from 'payload'
import config from '../src/payload.config'
import type { Header } from '../src/payload-types'

const updateHeader = async () => {
  const payload = await getPayload({ config })

  const navItems: NonNullable<Header['navItems']> = [
    { link: { type: 'custom' as const, url: '/', label: 'Home' } },
    { link: { type: 'custom' as const, url: '/services', label: 'Services' } },
    { link: { type: 'custom' as const, url: '/portfolio', label: 'Portfolio' } },
    { link: { type: 'custom' as const, url: '/about', label: 'About' } },
    { link: { type: 'custom' as const, url: '/careers', label: 'Careers' } },
    { link: { type: 'custom' as const, url: '/blog', label: 'Blog' } },
    { link: { type: 'custom' as const, url: '/contact', label: 'Contact' } },
  ]

  await payload.updateGlobal({
    slug: 'header',
    context: { disableRevalidate: true },
    data: {
      navItems,
    },
  })

  console.log('Header updated successfully')
  process.exit(0)
}

updateHeader()

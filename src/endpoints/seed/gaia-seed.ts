import type { Payload, PayloadRequest } from 'payload'

export const seedGaia = async ({ payload, req }: { payload: Payload; req: PayloadRequest }) => {
  payload.logger.info('Seeding Gaia Digital Agency data...')

  // 1. Create Media
  const media = await payload.find({
    collection: 'media',
    limit: 1,
  })
  const mediaId = media.docs[0]?.id

  // 2. Create Departments
  const deptNames = [
    'Branding',
    'Design',
    'Marketing',
    'Ad & SEO',
    'Website',
    'Social Media',
    'Content Creation',
    'Consultation',
    'Administration',
  ]
  const depts = []
  for (const name of deptNames) {
    const dept = await payload.create({
      collection: 'departments',
      context: { disableRevalidate: true },
      data: {
        name,
        description: `Our ${name} department specializes in premium digital solutions.`,
      },
    })
    depts.push(dept)
  }

  // 3. Create Services
  const serviceTitles = [
    'Branding',
    'Design',
    'Marketing',
    'Ad & SEO',
    'Website',
    'Social Media',
    'Content Creation',
    'Consultation',
    'Strategy',
  ]
  for (const title of serviceTitles) {
    await payload.create({
      collection: 'services',
      context: { disableRevalidate: true },
      data: {
        title,
        description: `Professional ${title} services tailored for your brand growth and digital presence.`,
        image: mediaId,
      },
    })
  }

  // 4. Create Portfolio
  for (let i = 1; i <= 5; i++) {
    await payload.create({
      collection: 'portfolio',
      context: { disableRevalidate: true },
      data: {
        title: `Project ${i}`,
        description: `A showcase of our premium work for Client ${i}, focused on digital excellence.`,
        image: mediaId,
      },
    })
  }

  // 5. Create About Items
  for (let i = 1; i <= 5; i++) {
    await payload.create({
      collection: 'about-items',
      context: { disableRevalidate: true },
      data: {
        title: `Our Value ${i}`,
        description: `We believe in digital innovation and providing value ${i} to our clients globally.`,
        image: mediaId,
      },
    })
  }

  // 6. Create Team Members
  const roles = ['CEO', 'Creative Director', 'Lead Developer', 'Marketing Head', 'Content Manager']
  for (let i = 0; i < 5; i++) {
    await payload.create({
      collection: 'team',
      context: { disableRevalidate: true },
      data: {
        name: `Team Member ${i + 1}`,
        role: roles[i],
        image: mediaId,
        department: depts[i % depts.length].id,
      },
    })
  }

  // 7. Create Forms
  const consultationForm = await payload.create({
    collection: 'forms',
    context: { disableRevalidate: true },
    data: {
      title: 'Consultation Form',
      fields: [
        { name: 'name', label: 'Name', required: true, blockType: 'text' },
        { name: 'email', label: 'Email', required: true, blockType: 'email' },
        { name: 'message', label: 'Message', required: true, blockType: 'textarea' },
        { name: 'hCaptcha', siteKey: '10000000-ffff-ffff-ffff-000000000001', secretKey: '0x0000000000000000000000000000000000000000', blockType: 'hCaptcha' },
      ],
      confirmationType: 'message',
      confirmationMessage: {
        root: {
          type: 'root',
          children: [{ type: 'paragraph', children: [{ text: 'Thank you for your inquiry!' }] }],
        },
      },
      submitButtonLabel: 'Submit',
    },
  })

  const careerForm = await payload.create({
    collection: 'forms',
    context: { disableRevalidate: true },
    data: {
      title: 'Career Application Form',
      fields: [
        { name: 'name', label: 'Name', required: true, blockType: 'text' },
        { name: 'email', label: 'Email', required: true, blockType: 'email' },
        { 
          name: 'department', 
          label: 'Department', 
          required: true, 
          blockType: 'select',
          options: deptNames.map(name => ({ label: name, value: name.toLowerCase() }))
        },
        { name: 'resume', label: 'Resume (PDF)', required: true, blockType: 'file' },
        { name: 'message', label: 'Message', required: true, blockType: 'textarea' },
      ],
      confirmationType: 'message',
      confirmationMessage: {
        root: {
          type: 'root',
          children: [{ type: 'paragraph', children: [{ text: 'Application received! We will contact you soon.' }] }],
        },
      },
      submitButtonLabel: 'Apply Now',
    },
  })

  // 8. Create Pages
  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Home',
      slug: 'home',
      _status: 'published',
      hero: {
        type: 'highImpact',
        richText: {
          root: {
            type: 'root',
            children: [{ type: 'heading', tag: 'h1', children: [{ text: 'Elevate Your Digital Brand' }] }],
          },
        },
        media: mediaId,
      },
      layout: [
        {
          blockType: 'contentMedia',
          mediaPosition: 'right',
          richText: {
            root: {
              type: 'root',
              children: [{ type: 'paragraph', children: [{ text: 'Welcome to Gaia Digital Agency. We transform digital ideas into premium experiences.' }] }],
            },
          },
          media: mediaId,
        },
        {
          blockType: 'contentMedia',
          mediaPosition: 'left',
          richText: {
            root: {
              type: 'root',
              children: [{ type: 'paragraph', children: [{ text: 'Our features include cutting-edge design and strategic marketing solutions.' }] }],
            },
          },
          media: mediaId,
        },
        {
          blockType: 'contentMedia',
          mediaPosition: 'right',
          richText: {
            root: {
              type: 'root',
              children: [{ type: 'paragraph', children: [{ text: 'Our writing team produces high-quality content that resonates with your audience and drives engagement.' }] }],
            },
          },
          media: mediaId,
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Services',
      slug: 'services',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        richText: {
          root: {
            type: 'root',
            children: [{ type: 'heading', tag: 'h1', children: [{ text: 'Our Services' }] }],
          },
        },
        media: mediaId,
      },
      layout: [
        {
          blockType: 'servicesBlock',
          title: 'Premium Solutions',
          description: 'We provide a wide range of digital services to help your business grow.',
        },
        {
          blockType: 'formBlock',
          enableIntro: true,
          introContent: {
            root: {
              type: 'root',
              children: [{ type: 'heading', tag: 'h2', children: [{ text: 'Free Consultation' }] }],
            },
          },
          form: consultationForm.id,
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Portfolio',
      slug: 'portfolio',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        richText: {
          root: {
            type: 'root',
            children: [{ type: 'heading', tag: 'h1', children: [{ text: 'Our Portfolio' }] }],
          },
        },
        media: mediaId,
      },
      layout: [
        {
          blockType: 'portfolioBlock',
          title: 'Featured Projects',
          description: 'Take a look at some of our latest work.',
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'About Us',
      slug: 'about',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        richText: {
          root: {
            type: 'root',
            children: [{ type: 'heading', tag: 'h1', children: [{ text: 'About Gaia' }] }],
          },
        },
        media: mediaId,
      },
      layout: [
        {
          blockType: 'aboutBlock',
          title: 'Who We Are',
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Careers',
      slug: 'careers',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        richText: {
          root: {
            type: 'root',
            children: [{ type: 'heading', tag: 'h1', children: [{ text: 'Join Our Team' }] }],
          },
        },
        media: mediaId,
      },
      layout: [
        {
          blockType: 'careerBlock',
          title: 'Departments',
          description: 'We are always looking for talented individuals to join our growing team.',
          form: careerForm.id,
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Contact Us',
      slug: 'contact',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: {
          root: {
            type: 'root',
            children: [{ type: 'heading', tag: 'h1', children: [{ text: 'Get in Touch' }] }],
          },
        },
      },
      layout: [
        {
          blockType: 'formBlock',
          enableIntro: true,
          introContent: {
            root: {
              type: 'root',
              children: [{ type: 'heading', tag: 'h2', children: [{ text: 'Contact Form' }] }],
            },
          },
          form: consultationForm.id,
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Blog',
      slug: 'blog',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        richText: {
          root: {
            type: 'root',
            children: [{ type: 'heading', tag: 'h1', children: [{ text: 'Our Blog' }] }],
          },
        },
        media: mediaId,
      },
      layout: [
        {
          blockType: 'archive',
          populateBy: 'collection',
          limit: 10,
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Coming Soon',
      slug: 'placeholder',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: {
          root: {
            type: 'root',
            children: [{ type: 'heading', tag: 'h1', children: [{ text: 'Placeholder Page' }] }],
          },
        },
      },
      layout: [
        {
          blockType: 'content',
          columns: [
            {
              size: 'full',
              richText: {
                root: {
                  type: 'root',
                  children: [{ type: 'paragraph', children: [{ text: 'This page is a placeholder for future content.' }] }],
                },
              },
            },
          ],
        },
      ],
    },
  })

  // 9. Update Globals
  await payload.updateGlobal({
    slug: 'settings',
    context: { disableRevalidate: true },
    data: {
      whatsappNumber: '+1234567890',
      contactEmail: 'contact@gaiada.com',
      socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
        { platform: 'tiktok', url: 'https://tiktok.com' },
        { platform: 'youtube', url: 'https://youtube.com' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    context: { disableRevalidate: true },
    data: {
      navItems: [
        { link: { type: 'custom', url: '/services', label: 'Services' } },
        { link: { type: 'custom', url: '/portfolio', label: 'Portfolio' } },
        { link: { type: 'custom', url: '/about', label: 'About' } },
        { link: { type: 'custom', url: '/careers', label: 'Careers' } },
        { link: { type: 'custom', url: '/blog', label: 'Blog' } },
        { link: { type: 'custom', url: '/contact', label: 'Contact' } },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    context: { disableRevalidate: true },
    data: {
      copyright: 'Copyright @2026',
      developedBy: 'Developed by Gaia Digital Agency',
      visitorCount: 1250,
      navItems: [
        { link: { type: 'custom', url: '/services', label: 'Services' } },
        { link: { type: 'custom', url: '/portfolio', label: 'Portfolio' } },
        { link: { type: 'custom', url: '/about', label: 'About' } },
        { link: { type: 'custom', url: '/careers', label: 'Careers' } },
        { link: { type: 'custom', url: '/blog', label: 'Blog' } },
        { link: { type: 'custom', url: '/contact', label: 'Contact' } },
      ],
    },
  })

  payload.logger.info('Gaia Digital Agency seeding completed successfully!')
}

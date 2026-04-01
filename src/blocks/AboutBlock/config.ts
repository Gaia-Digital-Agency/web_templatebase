import type { Block } from 'payload'

export const AboutBlock: Block = {
  slug: 'aboutBlock',
  labels: {
    singular: 'About Block',
    plural: 'About Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
  ],
}

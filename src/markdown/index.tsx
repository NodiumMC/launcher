import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeReact from 'rehype-react'
import { createElement } from 'react'
import { Text } from 'components/atoms/Text'
import { Checkbox } from 'components/atoms/Checkbox'

export const parse = async (md: string) =>
  unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeReact, {
      createElement,
      components: {
        h1: (props: any) => <Text {...props} as={'h1'} weight={'bold'} />,
        h2: (props: any) => <Text {...props} as={'h2'} weight={'bold'} />,
        h3: (props: any) => <Text {...props} as={'h3'} weight={'regular'} />,
        h4: (props: any) => <Text {...props} as={'h4'} weight={'regular'} />,
        h5: (props: any) => <Text {...props} as={'h5'} weight={'regular'} />,
        h6: (props: any) => <Text {...props} as={'h6'} weight={'thin'} />,
        p: (props: any) => <Text {...props} as={'p'} shade={'low'} />,
        strong: (props: any) => <Text {...props} as={'strong'} />,
        del: (props: any) => <Text {...props} as={'del'} />,
        input: (props: any) => <Checkbox {...props} style={{ marginRight: '0.5rem' }} />,
      },
    })
    .process(md)

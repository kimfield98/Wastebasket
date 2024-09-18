import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React, { ReactNode } from 'react';

interface TableProps {
  data: {
    headers: string[];
    rows: (string | number)[][];
  };
  align?: ('left' | 'center' | 'right')[];
}

function Table({ data, align }: TableProps) {
  const alignments = align || data.headers.map(() => 'left')

  const renderCell = (content: string | number): ReactNode => {
    if (typeof content !== 'string') {
      return content;
    }

    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;
    const elements: ReactNode[] = [];

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        elements.push(content.slice(lastIndex, match.index));
      }
      
      elements.push(
        <a 
          key={match.index} 
          href={match[2]} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-blue-600 dark:decoration-blue-400 hover:decoration-blue-800 dark:hover:decoration-blue-300"
        >
          {match[1]}
        </a>
      );

      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < content.length) {
      elements.push(content.slice(lastIndex));
    }

    return elements.length > 0 ? <>{elements}</> : content;
  }

  return (
    <table className="border-collapse w-full">
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th 
              key={index} 
              className={`border-b border-gray-300 dark:border-gray-700 p-2 bg-gray-100 dark:bg-neutral-950 text-${alignments[index]}`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b border-gray-200 dark:border-gray-700 dark:bg-neutral-950">
            {row.map((cell, cellIndex) => (
              <td 
                key={cellIndex} 
                className={`p-2 text-${alignments[cellIndex]}`}
              >
                {renderCell(cell)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function CustomLink(props) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-blue-600 dark:decoration-blue-400 hover:decoration-blue-800 dark:hover:decoration-blue-300"
    {...props} 
  />
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children)
  return <code 
    dangerouslySetInnerHTML={{ __html: codeHTML }} 
    className='text-sm font-mono bg-gray-100 p-1 rounded-md dark:bg-gray-900 dark:text-gray-100'
    {...props} 
  />
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
}

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}

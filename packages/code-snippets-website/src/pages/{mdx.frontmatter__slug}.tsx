import * as React from 'react';
import { graphql } from 'gatsby';
import { SharedLayout } from '../shared-layout';
import { MDXRenderer } from 'gatsby-plugin-mdx';

interface MarkdownPageProps {
  data: any;
}

const MarkdownPage = ({ data }: MarkdownPageProps) => {
  const { mdx } = data;
  return (
    <SharedLayout>
      <MDXRenderer className="prose lg:prose-xl">{mdx.body}</MDXRenderer>
    </SharedLayout>
  );
};

export default MarkdownPage;

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        slug
      }
    }
  }
`;

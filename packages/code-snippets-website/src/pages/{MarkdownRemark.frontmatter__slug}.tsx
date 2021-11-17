import * as React from 'react';
import { graphql } from 'gatsby';
import { SharedLayout } from '../shared-layout';

interface MarkdownPageProps {
  data: any;
}

const MarkdownPage = ({ data }: MarkdownPageProps) => {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { html } = markdownRemark;
  return (
    <SharedLayout>
      <div
        className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </SharedLayout>
  );
};

export default MarkdownPage;

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
      }
    }
  }
`;

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';


export async function GET(context) {
  const blog = await getCollection('blog');
  console.log(blog.length, blog);
  return rss({
    title: 'Gelseyland Fast Past',
    description: 'Get your ticket straight into a wild adventure of words',
    site: context.site,
    stylesheet: '/rss/styles.xsl',
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
  });
}
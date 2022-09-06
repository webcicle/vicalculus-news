import groq from 'groq';
import client from '../client/sanity';

interface Params {
	slug: string;
}

export async function post({ request }: { request: Request }) {
	const { slug } = await request.json();

	console.log(slug);

	const slugsQuery = groq`*[_type == 'article' && slug.current == $slug && !(_id in path('drafts.**'))] {
      publishedAt,
      _id,
      "author": author->name,
      "categories": categories[]->title,
      "mainImg": mainImage,
      "slug": slug.current,
      "comments": *[_type == "comment" && references(^._id)]{
      _createdAt,
  _id,
  approved_by_admin,
  comment,
  email,
  name,
  emailPublic
} | order(createdAt desc),
      title,
      body,
      meta_description,
      meta_title,
      og_description,
      og_image,
      og_title,
      og_type,
   }`;

	const post = await client.fetch(slugsQuery, { slug: slug });

	return new Response(JSON.stringify(post), { status: 200 });
}

// import next type for getStatic path

import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, GetStaticPropsContext } from 'next';

// import colors array
import colors from '../data/colors.json';

type Color = {
	name: string;
	hex: string;
};

// get static paths for colors in json array
export const getStaticPaths: GetStaticPaths = async () => {
	const paths = colors.map((color) => ({
		params: { color: color.name },
	}));

	return { paths, fallback: false };
};

// get static props for colors pages
export const getStaticProps: GetStaticProps = async (context) => {
	const params = context.params;
  // prevent params from being undefined
	if (!params || typeof params.color !== 'string') {
		return { notFound: true }; // or handle the case when color is missing
	}
	// find the info for just one color
	const color = colors.find((color) => color.name === params.color);
	if (!color) {
		return { notFound: true }; // or handle the case when color is not found
	}
	// return it in the necessary format
	return { props: { color } };
};

// export component
const Color = ({ color }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<div className='color-page' style={{ backgroundColor: color.hex }}>
			<h1>{color.name}</h1>
		</div>
	);
};

export default Color;

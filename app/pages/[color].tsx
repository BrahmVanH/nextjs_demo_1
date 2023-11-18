// import next type for getStatic path

import { GetStaticPaths } from 'next';

// import colors array
import colors from '../data/colors.json';

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = colors.map((color) => ({
		params: { color: color.name },
	}));

	return { paths, fallback: false };
};

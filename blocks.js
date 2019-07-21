/**
 * WordPress dependencies
 */
const { registerBlockType } = wp.blocks;

// Category slug and title
const category = {
	slug: 'coblocks',
	title: 'CoBlocks',
};

// Custom foreground icon color based on the CoBlocks branding
const iconColor = '#1e35b9';

// Register block category
import icons from './utils/block-category';

// Editor and Frontend Styles
import './styles/editor.scss';
import './styles/style.scss';

// Extensions
// import './extensions/colors/inspector';
import './extensions/attributes';
// import './extensions/advanced-controls';
// import './extensions/list-styles';
// import './extensions/button-styles';
// import './extensions/button-controls';

// Formats
import './formats/';

// Block Gallery
import './components/block-gallery';

// Register Blocks
import * as buttons from './blocks/buttons';
import * as clickToTweet from './blocks/click-to-tweet';
import * as dynamicSeparator from './blocks/dynamic-separator';
import * as pricingTable from './blocks/pricing-table';
import * as pricingTableItem from './blocks/pricing-table/pricing-table-item';
import * as hero from './blocks/hero';
import * as stacked from './blocks/gallery-stacked';
import * as masonry from './blocks/gallery-masonry';

export function registerBlocks() {
	[
		buttons,
		clickToTweet,
		dynamicSeparator,
		hero,
		masonry,
		pricingTable,
		pricingTableItem,
		stacked,
	].forEach(block => {
		if (!block) {
			return;
		}

		const { name, icon, settings } = block;

		registerBlockType(`coblocks/${name}`, {
			category: category.slug,
			icon: { src: icon, foreground: iconColor },
			...settings,
		});
	});
}
registerBlocks();

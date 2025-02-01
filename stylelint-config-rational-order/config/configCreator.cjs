const special = require('../groups/special.cjs');
const positioning = require('../groups/positioning.cjs');
const boxModel = require('../groups/boxModel.cjs');
const typography = require('../groups/typography.cjs');
const animation = require('../groups/animation.cjs');
const visual = require('../groups/visual.cjs');
const misc = require('../groups/misc.cjs');

module.exports = ({
	'border-in-box-model': borderInBoxModel = false,
	'empty-line-between-groups': emptyLineBetweenGroups = false
} = {}) =>
	[
		['Special', special],
		['Positioning', positioning],
		['Box Model', boxModel({ border: borderInBoxModel })],
		['Typography', typography],
		['Visual', visual({ border: !borderInBoxModel })],
		['Animation', animation],
		['Misc', misc]
	].map(([groupName, properties]) => ({
		emptyLineBefore: emptyLineBetweenGroups ? 'always' : 'never',
		properties,
		groupName
	}));

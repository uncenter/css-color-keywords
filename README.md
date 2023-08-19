# css-color-keywords-better

An ESM-only type-annotated list of all CSS color keywords.

This list contains all CSS color keywords specified in:

- [CSS Level 1](https://www.w3.org/TR/CSS1/#color-units)
- [CSS Level 2 (Revision 1)](https://www.w3.org/TR/CSS2/syndata.html#value-def-color)
- [CSS Color Module Level 3](https://drafts.csswg.org/css-color-3/#colorunits)
- [CSS Color Module Level 4](https://drafts.csswg.org/css-color/#named-colors)

[See MDN reference on color keywords](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Color_keywords).

## Installation

```sh
npm i css-color-keywords-better
pnpm add css-color-keywords-better
yarn add css-color-keywords-better
```

## Usage

```js
import { colorsByName, colorsByHex } from 'css-color-keywords-better';
```

This package has no default export. It provides two typed objects containing the colors and keywords, `colorsByHex` and `colorsByName`.

```js
console.log(colorsByHex); //  { '#f0f8ff': [ 'aliceblue' ], ... }
console.log(colorsByName); // { aliceblue: '#f0f8ff', ... }
```

You can also grab two helper functions, `getHexForName` and `getNamesForHex`, for better case-insensitivity:

```js
import {
	colorsByName,
	colorsByHex,
	getHexForName,
	getNamesForHex,
} from 'css-color-keywords-better';

// ✅ Case-insensitive with helper functions:
getHexForName('aLiCeBlUe'); // #f0f8ff
getNamesForHex('#A9A9A9'); // [ 'darkgray', 'darkgrey' ]

// ✅ Graceful handling of misspellings or invalid inputs:
getHexForName('fakecolor'); // null
getNamesForHex('#NotAColor'); // []

// ⚠️ Case-sensitive bracket/dot notation (must be lowercase):
colorsByName['aliceblue']; // #f0f8ff
colorsByName.aliceblue; // #f0f8ff
colorsByHex['#a9a9a9']; // [ 'darkgray', 'darkgrey' ]

// ⚠️ No handling of misspellings or invalid inputs (undefined!):
colorsByName['fakecolor']; // undefined
colorsByName.fakecolor; // undefined
colorsByHex['#NotAColor']; // undefined
```

## License

[MIT](LICENSE)

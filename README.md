<h1 align="center">Hungry Tickets - Ticket Evolution Seatmaps</h1>

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Known Vulnerabilities](https://snyk.io/test/github/ticketevolution/seatmaps-client/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ticketevolution/seatmaps-client?targetFile=package.json)

A client side JavaScript library that enables users to view seatmaps customized based on zones by:

1. Fetching the map SVG and manifest JSON, with the given `venueId` and `configurationId`, from Ticket Evolution AWS S3 buckets using the `mapsDomain` (defaults to maps.ticketevolution.com). Customized manifests and map SVGs are used for certain seatmaps that have been customized.
1. Rendering the map in the provided DOM element via the `.build` function which accepts the `id` of the element as an argument (see below for an example DOM setup).
1. Color map sections according to the zones.
1. Render a tooltip when the user hovers over a section, which will provide details of best offer.

_Note: Sections will not color and you will not be able to highlight/toggle sections via the map or the API until ticket groups are supplied to the map, either through `ticketGroups` configuration or `updateTicketGroups` API._

After instantiation, a [public API](#public-api) is available with a limited number of functions to interact with the map.

# Installation and Usage Options

## CommonJS

### 1. Install via `npm` or `yarn`

```sh
npm install --save @sukra-infotek/hungry-tickets-seatmap-client
```

or

```sh
yarn add @sukra-infotek/hungry-tickets-seatmap-client
```

### 2. Create a script that includes `@sukra-infotek/hungry-tickets-seatmap-client`

```js
// main.js

import { SeatmapFactory } from "@sukra-infotek/hungry-tickets-seatmap-client";

// create a new seatmap
const seatmap = new SeatmapFactory({
  venueId: "896",
  configurationId: "14341",
  ticketGroups: [
    {
      tevo_section_name: "lower level corner 104",
      retail_price: 100,
    },
  ],
});

// turn element with ID of 'my-map' into a seatmap for config 14341
const seatmapApi = seatmap.build("my-map");

// perform some actions, like highlighting section "lower level corner 104"
seatmapApi.highlightSection("lower level corner 104");
```

### In case your app is a React app, you can use the `TicketMap` component

```tsx
import { createRoot } from "react-dom/client";
import { TicketMap } from "@ticketevolution/seatmaps-client";

const rootEl = document.getElementById("my-map");
if (!rootEl) {
  throw new Error("no root element in html");
}

const root = createRoot(rootEl);

root.render(
  <TicketMap
    venueId="896"
    configurationId="14341"
    ticketGroups={[
      {
        tevo_section_name: "lower level corner 104",
        retail_price: 100,
      },
    ]}
    manifest={manifest}
    customeSvg={customSvg}
  />,
);
```

## API Reference

### `class Tevomaps`

#### `new Tevomaps(options: object)`

Options:

| Name                  | Required | Type                           | Default Value                                                                                                                                                                                                                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------- | -------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `venueId`             | ✓        | `string`                       |                                                                                                                                                                                                                                                    | Ticket Map Venue ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `configurationId`     | ✓        | `string`                       |                                                                                                                                                                                                                                                    | Ticket Map Configuration ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `mapFontFamily`       |          | `string`                       |                                                                                                                                                                                                                                                    | Set a default font for the map. Native browser fonts available, a list below is provided but results may vary depending upon the browser and browser version.<br><br>• Helvetica<br>• Arial<br>• Times<br>• Times New Roman<br>• Courier<br>• Courier New<br>• Verdana<br>• Tahoma                                                                                                                                                                                                                                                                                                                                          |
| `mapsDomain`          |          | `string`                       | `https://maps.ticketevolution.com`                                                                                                                                                                                                                 | The domain from which map SVGs and manifests will be fetched. To pull maps from the development environment, use `https://maps-dev.ticketevolution.com`                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `onSelection`         |          | `function`                     |                                                                                                                                                                                                                                                    | A function which will be called by Tevomaps when a section of the map has been clicked. It will pass as a zone of the currently selected section and expect nothing back. |
| `selectedSections`    |          | `string[]`                     | `[]`                                                                                                                                                                                                                                               | An array of section IDs for the map to initially highlight by default when it is rendered.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `ticketGroups`        |          | [`TicketGroup[]`](#interfaces) | `[]`                                                                                                                                                                                                                                               | An array of ticket groups to be used for section pricing. Expects each ticket group to adhere to the [TicketGroup interface](#interfaces). This API was designed for you to directly pass into the client library the response from the [Ticket Evolution `/v9/listings` endpoint](https://ticketevolution.atlassian.net/wiki/spaces/API/pages/2853797930/Listings+Index).                                                                                                                                                                                                                                                  |
| `showControls`        |          | `boolean`                      | `true`                                                                                                                                                                                                                                             | When set to true, the map controls (the zoom in, zoom out, reset zoom, and clear selection buttons) will be visible.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `showLegend`          |          | `boolean`                      | `true`                                                                                                                                                                                                                                             | When set to true, the map legend will be visible.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `mouseControlEnabled` |          | `boolean`                      | `true`                                                                                                                                                                                                                                             | When set to true, the map will respond to mouse events (such as click, move, and hover).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `showZoomHelper` |          | `boolean`                      | `true`                                                                                                                                                                                                                                             | When set to `true`, the ZoomHelper overlay will appear when the page loads on mobile devices.<br>**Note:** This flag applies only when `mouseControlEnabled` is set to `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

#### `updateTicketGroups(groups: TicketGroup[])`

Changes the collection of ticket groups in the map used to calculate available sections and section prices. Useful if you have a feature for filtering ticket groups and you want the map to update.

#### `highlightSection(section: string)`

Temporarily colors the given section by making it more opaque. This is the same effect used for hovering on a section.

#### `unhighlightSection(section: string)`

Removes the highlight effect of the given section, if it's not selected, by reverting it back to its base transparency. This is the same effect used for hovering off on a section.

#### `selectSection(section: string)`

This is the same effect used for clicking on a section to select it. It colors the section and will not revert back by hovering off it or calling `unhighlightSection`. Calls the `onSelection` callback with the updated array of selected sections.

#### `deselectSection(section: string)`

This is the same effect used for clicking on a section to deselect it. It reverts the color of the section and is the only way to unhighlight a selected section. Calls the `onSelection` callback with the updated array of selected sections.

# Interfaces

| Name        | Properties                                                                                                            |
| ----------- | --------------------------------------------------------------------------------------------------------------------- |
| TicketGroup | `{`<br>&nbsp;&nbsp;&nbsp;&nbsp;`tevo_section_name: string;`<br>&nbsp;&nbsp;&nbsp;&nbsp;`retail_price: number;`<br>`}` |

import pick from "lodash.pick";
import union from "lodash.union";
import { createRoot } from "react-dom/client";
import type {
  DefaultProps,
  Props,
  PublicApi,
  RequiredProps,
} from "./TicketMap";
import {
  TicketMap,
} from "./TicketMap";

const requiredConfigKeys: (keyof RequiredProps)[] = [
  "venueId",
  "configurationId",
];

const optionalConfigKeys: (keyof DefaultProps)[] = [
  "mapFontFamily",
  "selectedSections",
  "onSelection",
  "ticketGroups",
  "mapsDomain",
  "showControls",
  "showLegendOpenAlwaysForDesktop",
  "showLegend",
  "openLegendInitially",
  "mouseControlEnabled",
  "showZoomHelper",
];

export function extractConfigurationFromOptions(options: Props): Props {
  const keys = union(requiredConfigKeys, optionalConfigKeys);
  return pick(options, keys);
}

export function validateOptions(options: Props) {
  for (const key of requiredConfigKeys) {
    if (!(key in options)) {
      throw new Error(`Seatmap configuration requires a "${key}" value.`);
    }
  }
}

export class SeatmapFactory {
  configuration: Props;

  constructor(options: Props) {
    validateOptions(options);
    this.configuration = extractConfigurationFromOptions(options);
  }

  build(rootElementId: string): PublicApi | undefined {
    if (!rootElementId) {
      throw new Error("Seatmaps must be initialized with a DOM element.");
    }

    const rootElement = document.getElementById(rootElementId);
    if (!rootElement) {
      throw new Error("Seatmaps must be initialized with a DOM element.");
    }

    let map: TicketMap | undefined;

    const root = createRoot(rootElement);

    root.render(
      <TicketMap
        {...this.configuration}
        ref={(ref: TicketMap) => {
          map = ref;
        }}
      />
    );

    return map?.publicApi;
  }
}

export { TicketMap };

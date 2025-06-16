import { lruMemoize, createSelectorCreator } from "reselect";

import isEqual from "lodash.isequal";

import type { TicketGroup } from "../types/TicketGroups";
import type {
  State,
  TicketGroupsBySection,
} from "../types/TicketMap";

const $ticketGroups = (state: State) => state.ticketGroups;
const $sectionMapping = (state: State) => state.sectionMapping;

const createDeepEqualSelector = createSelectorCreator(lruMemoize, isEqual);

export const $missingSectionIds = createDeepEqualSelector(
  $sectionMapping,
  $ticketGroups,
  (sectionMapping, ticketGroups) =>
    ticketGroups
      .map((ticketGroup) => ticketGroup.tevo_section_name)
      .filter((sectionId) => sectionMapping[sectionId] === undefined),
);

export const $availableTicketGroups = createDeepEqualSelector(
  $ticketGroups,
  $sectionMapping,
  (ticketGroups, sectionMapping) =>
    ticketGroups
      .map((ticketGroup): TicketGroup => {
        const section = ticketGroup.tevo_section_name;
        const isSectionInTheManifest = sectionMapping[section];

        return (
          isSectionInTheManifest && {
            tevo_section_name: ticketGroup.tevo_section_name,
            retail_price: ticketGroup.retail_price,
            color: ticketGroup.color,
            zone_name: ticketGroup.zone_name,
          }
        );
      })
      .filter((ticketGroup) => ticketGroup),
);

export const $ticketGroupsBySection = createDeepEqualSelector(
  $availableTicketGroups,
  (ticketGroups): TicketGroupsBySection =>
    ticketGroups.reduce(
      (memo: TicketGroupsBySection, ticketGroup) => ({
        ...memo,
        [ticketGroup.tevo_section_name]: [
          ...(memo[ticketGroup.tevo_section_name] || []),
          ticketGroup,
        ],
      }),
      {},
    ),
);

export const $venueSections = createDeepEqualSelector(
  $ticketGroupsBySection,
  Object.keys,
);

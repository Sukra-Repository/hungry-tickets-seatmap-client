import type { TicketGroup } from "./TicketGroups";

export interface TicketGroupsBySection {
  [section: string]: TicketGroup[];
}

export interface SectionMapping {
  [section: string]: {
    sectionName: string;
  };
}

export interface Manifest {
  sections: {
    [key: string]: {
      "zone_name": string;
    };
  };
}

export interface DefaultProps {
  showLegend: boolean;
  mapFontFamily: string;
  selectedSections: string[];
  ticketGroups: TicketGroup[];
  mapsDomain: string;
  onSelection(zone: string): void;
  showControls: boolean;
  showLegendOpenAlwaysForDesktop: boolean;
  openLegendInitially: boolean;
  mouseControlEnabled: boolean;
  showZoomHelper: boolean;
  missingSeatMapLogo?: React.ReactNode;
  customMapSvg?: string;
}

export interface RequiredProps {
  venueId: string;
  configurationId: string;
  manifest: Manifest;
}

export type Props = Partial<DefaultProps> & RequiredProps;

export interface State {
  mapSvg?: SVGSVGElement;
  sectionMapping: SectionMapping;
  manifest: Manifest;
  ticketGroups: TicketGroup[];
  selectedSections: Set<string>;
  currentHoveredSection?: string;
  tooltipActive: boolean;
  tooltipSectionName: string;
  tooltipZoneName: string;
  tooltipX: number;
  tooltipY: number;
  mapNotFound: boolean;
  touchStarts: {
    [touchID: number]: {
      x: number;
      y: number;
    };
  };
  dragging: boolean;
  isTouchDevice: boolean;
  // NOTE: unused internaly, should be removed in next version
  previousTouches?: unknown;
}

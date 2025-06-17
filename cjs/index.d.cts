import * as react_jsx_runtime from 'react/jsx-runtime';
import React$1, { Component } from 'react';

interface ZoomControl {
    zoomIn: (percent: number) => void;
    zoomOut: (percent: number) => void;
    reset: () => void;
    teardown: () => void;
    enable: () => void;
    disable: () => void;
}

interface TicketGroup {
    tevo_section_name: string;
    zone_name: string;
    color: string;
    retail_price: number;
    description?: string;
}

interface SectionMapping {
    [section: string]: {
        sectionName: string;
    };
}
interface Manifest {
    sections: {
        [key: string]: {
            "zone_name": string;
        };
    };
}
interface DefaultProps {
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
interface RequiredProps {
    venueId: string;
    configurationId: string;
    manifest: Manifest;
}
type Props = Partial<DefaultProps> & RequiredProps;
interface State {
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
    previousTouches?: unknown;
}

interface PublicApi {
    updateTicketGroups: (ticketGroups: TicketGroup[]) => void;
    highlightSection: (section: string) => void;
    unhighlightSection: (section?: string) => void;
    selectSection: (section: string) => void;
    deselectSection: (section?: string) => void;
}
interface ElementProperties {
    [key: string]: string;
}
type PropertiesForElement = (element: Element) => ElementProperties;
declare class TicketMap extends Component<Props & DefaultProps, State> {
    publicApi: PublicApi;
    mapRoot: React$1.RefObject<HTMLDivElement | null>;
    container: React$1.RefObject<HTMLDivElement | null>;
    zoom?: ZoomControl;
    static defaultProps: DefaultProps;
    constructor(props: Props & DefaultProps);
    isTouchDevice: () => boolean;
    /**
     * Lifecycle
     */
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    componentDidUpdate(_prevProps: Props, prevState: State): void;
    fetchMap(): Promise<void>;
    fetchManifest(): void;
    getMapRootElement: () => HTMLDivElement | null;
    setupMap(): void;
    /**
     * Properties
     */
    get configFilePath(): string;
    /**
     * Public Methods
     */
    highlightSection: (section: string) => void;
    unhighlightSection: (section?: string) => void;
    selectSection: (section: string) => void;
    deselectSection: (section?: string) => void;
    updateTicketGroups: (ticketGroups?: TicketGroup[]) => void;
    /**
     * Colors
     */
    setUnavailableColors: () => void;
    fillUnavailableColors: () => void;
    fillPathsForSection: (propertiesForElement: PropertiesForElement, section?: string) => void;
    fillPathsForZone: (propertiesForElement: PropertiesForElement, section?: string) => void;
    getAllPaths: (id?: string) => Element[];
    getAllPathsForZone: (id?: string) => Element[];
    /**
     * Helpers
     */
    clearSelection: () => void;
    toggleSectionHighlight: (section?: string, shouldHighlight?: boolean) => void;
    toggleSectionSelect: (section?: string | null, shouldHighlight?: boolean) => void;
    updateMap(): void;
    fillZone(section: string, shouldHighlight?: boolean): void;
    getSectionFromTarget(target?: HTMLElement | null): string | undefined;
    /**
     * Coloring
     */
    getDefaultColor(ticketGroups?: TicketGroup[]): string;
    /**
     * Interaction Callbacks
     */
    onMouseOver: ({ clientX, clientY, target, }: React$1.MouseEvent<HTMLElement>) => void;
    onMouseOut: ({ relatedTarget }: React$1.MouseEvent<HTMLElement>) => void;
    onMouseMove: ({ nativeEvent }: React$1.MouseEvent<HTMLElement>) => void;
    onClick: () => void;
    onTouchStart: (e: React$1.TouchEvent<HTMLElement>) => void;
    onTouchMove: () => void;
    onTouchEnd: (e: React$1.TouchEvent<HTMLElement>) => void;
    /**
     * Interactions
     */
    doHover(target: HTMLElement, tooltipX?: number, tooltipY?: number): void;
    doHoverCleanup(enteringElement: HTMLElement): void;
    doSelect(section?: string | undefined): void;
    handleZoomIn: () => void;
    handleZoomOut: () => void;
    handleResetZoom: () => void;
    render(): react_jsx_runtime.JSX.Element;
}

declare function extractConfigurationFromOptions(options: Props): Props;
declare function validateOptions(options: Props): void;
declare class SeatmapFactory {
    configuration: Props;
    constructor(options: Props);
    build(rootElementId: string): PublicApi | undefined;
}

export { SeatmapFactory, TicketMap, extractConfigurationFromOptions, validateOptions };

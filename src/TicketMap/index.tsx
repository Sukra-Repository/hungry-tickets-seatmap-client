import React, { Component } from "react";
import isEqual from "lodash.isequal";
import fetchPonyfill from "fetch-ponyfill";

import Actions from "../Actions";
import Tooltip from "../Tooltip";
import ZoomHelper from "../ZoomHelper";
import MissingSeatMapLogo from "../icons/MissingSeatMapLogo";

import { type ZoomControl, initializeZoom } from "../utils/zoom";

import type { TicketGroup } from "../types/TicketGroups";
import type { State, Props, DefaultProps } from "../types/TicketMap";

import {
  $availableTicketGroups,
  $missingSectionIds,
  $ticketGroupsBySection,
  $venueSections,
} from "../utils/selectors";

export * from "../types/TicketMap";

export interface PublicApi {
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

class MapNotFoundError extends Error {
  name = "MapNotFoundError";
  constructor(message = "This map is not currently available.") {
    super(message);
  }
}

export const highlightedSectionColor = "#1C1C1C";
export const unhighlightedSectionColor = "#FFFFFF";

// Needed to support SSR in some cases - in case user wants to prerender/cache map html serverside.
const { fetch: isomorphicFetch } = fetchPonyfill();
export class TicketMap extends Component<Props & DefaultProps, State> {
  publicApi: PublicApi;
  mapRoot = React.createRef<HTMLDivElement>();
  container = React.createRef<HTMLDivElement>();
  zoom?: ZoomControl;

  static defaultProps: DefaultProps = {
    mapsDomain: "https://maps.ticketevolution.com",
    onSelection: () => { },
    selectedSections: [],
    ticketGroups: [],
    showLegend: true,
    showLegendOpenAlwaysForDesktop: false,
    showControls: true,
    openLegendInitially: false,
    mouseControlEnabled: true,
    showZoomHelper: true,
    mapFontFamily: "inherit",
  };

  constructor(props: Props & DefaultProps) {
    super(props);
    this.state = {
      sectionMapping: {},
      manifest: this.props.manifest,
      selectedSections: new Set(
        this.props.selectedSections.filter((section) => !!section),
      ),
      tooltipActive: false,
      tooltipSectionName: "",
      tooltipZoneName: "",
      tooltipX: 0,
      tooltipY: 0,
      ticketGroups: this.props.ticketGroups,
      mapNotFound: false,
      touchStarts: {},
      dragging: false,
      isTouchDevice: false,
    };

    this.publicApi = {
      updateTicketGroups: this.updateTicketGroups,
      highlightSection: this.highlightSection,
      unhighlightSection: this.unhighlightSection,
      selectSection: this.selectSection,
      deselectSection: this.deselectSection,
    };
  }

  isTouchDevice = () => {
    return "ontouchstart" in document.documentElement;
  };

  /**
   * Lifecycle
   */

  async componentDidMount() {
    this.setState({
      isTouchDevice: this.isTouchDevice(),
    });

    try {
      await this.fetchMap();
      this.setupMap();
      this.fetchManifest();
      this.updateMap();
    } catch (error) {
      console.error(error);
      if (
        error &&
        typeof error === "object" &&
        "name" in error &&
        error.name === "MapNotFoundError"
      ) {
        this.setState({ mapNotFound: true });
      }
    }
  }

  componentWillUnmount() {
    if (this.zoom) {
      this.zoom.teardown();
    }
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    const availableTicketGroupsDidChange =
      $availableTicketGroups(prevState) !== $availableTicketGroups(this.state);
    const isNoLongerHoveringOnSection =
      prevState.currentHoveredSection !== undefined &&
      this.state.currentHoveredSection === undefined;
    const selectedSectionsDidChange = !isEqual(
      this.state.selectedSections,
      prevState.selectedSections,
    );

    if (
      this.mapRoot.current &&
      (isNoLongerHoveringOnSection ||
        availableTicketGroupsDidChange ||
        selectedSectionsDidChange)
    ) {
      this.updateMap();
    }

    if (selectedSectionsDidChange) {
      const selectedZone = this.props.manifest.sections[Array.from(this.state.selectedSections)[0]]?.zone_name;

      if (selectedZone) {
        this.props.onSelection(selectedZone);
      }
    }

    if (
      $missingSectionIds(prevState) !== $missingSectionIds(this.state) &&
      $missingSectionIds(this.state).length > 0
    ) {
      console.warn(
        "Unknown section names found in ticket groups: %o",
        $missingSectionIds(this.state),
      );
    }

    if (
      _prevProps.mouseControlEnabled !== this.props.mouseControlEnabled &&
      this.zoom
    ) {
      if (this.props.mouseControlEnabled) {
        this.zoom.enable();
      } else {
        this.zoom.disable();
      }
    }
  }

  async fetchMap() {
    let mapHtml = '';
    if (this.props.customMapSvg) {
      mapHtml = this.props.customMapSvg;
    }
    else {
      const mapResponse = await isomorphicFetch(`${this.configFilePath}/map.svg`);
      if (!mapResponse.ok) {
        throw new MapNotFoundError();
      }
      mapHtml = await mapResponse.text();
    }

    // Can't use dangerouslySetInnerHTML={{ __html: this.state.mapHtml }} in this case because
    // re-rendering would inject all t
    // his HTML again, which would break all the event bindings
    // we set in future methods.
    if (this.mapRoot.current) {
      this.mapRoot.current.innerHTML = mapHtml;
      const svg = this.mapRoot.current.querySelector("svg");
      if (svg && this.props.mouseControlEnabled) {
        this.zoom = initializeZoom(svg);
      }
    }
  }

  fetchManifest() {
    this.setState({
      sectionMapping: Object.keys(this.props.manifest.sections).reduce(
        (memo, sectionName) => ({
          ...memo,
          [sectionName]: {
            sectionName,
          },
        }),
        {},
      ),
    });

    this.setState({ manifest: this.props.manifest });
  }

  getMapRootElement = () => {
    return this.mapRoot.current;
  };

  setupMap() {
    const mapRootElement = this.getMapRootElement();
    if (!mapRootElement) {
      return;
    }
    const mapSvg = mapRootElement.querySelector("svg");
    if (!mapSvg) {
      return;
    }

    Object.assign(mapSvg.style, {
      position: "absolute",
      zIndex: 0,
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
    });

    this.setUnavailableColors();

    mapSvg
      .querySelectorAll<HTMLElement>("*[data-section-id]")
      .forEach((path) => {
        const sectionId = path.getAttribute("data-section-id");
        if (!sectionId) {
          return;
        }
        path.setAttribute("data-section-id", sectionId);
      });

    mapSvg.querySelectorAll<HTMLElement>("text").forEach((text) => {
      text.style.pointerEvents = "none";
    });

    this.setState({ mapSvg });
  }

  /**
   * Properties
   */

  get configFilePath() {
    return `${this.props.mapsDomain}/${this.props.venueId}/${this.props.configurationId}`;
  }

  /**
   * Public Methods
   */

  highlightSection = (section: string) =>
    this.toggleSectionHighlight(section, true);

  unhighlightSection = (section?: string) => {
    if (!section) {
      return this.setState({ currentHoveredSection: undefined, currentHoveredZone: undefined });
    }
    return this.toggleSectionHighlight(section, false);
  };

  selectSection = (section: string) => this.toggleSectionSelect(section, true);

  deselectSection = (section?: string) => {
    if (!section) {
      return this.clearSelection();
    }
    return this.toggleSectionSelect(section, false);
  };

  updateTicketGroups = (ticketGroups = this.props.ticketGroups) =>
    this.setState({ ticketGroups });

  /**
   * Colors
   */

  setUnavailableColors = () =>
    this.fillPathsForSection((element) => ({
      "data-unavailable-color": element.getAttribute("fill") as string,
    }));

  fillUnavailableColors = () =>
    this.fillPathsForSection((element) => ({
      fill: element.getAttribute("data-unavailable-color") as string,
      opacity: "1",
      "stroke-width": "1",
      stroke: unhighlightedSectionColor,
    }));

  fillPathsForSection = (
    propertiesForElement: PropertiesForElement,
    section?: string,
  ): void =>
    this.getAllPaths(section).forEach((element) =>
      Object.entries(propertiesForElement(element)).forEach(
        ([property, value]) => element.setAttribute(property, value),
      ),
    );

  fillPathsForZone = (
    propertiesForElement: PropertiesForElement,
    section?: string,
  ): void =>
    this.getAllPathsForZone(section).forEach((element) =>
      Object.entries(propertiesForElement(element)).forEach(
        ([property, value]) => element.setAttribute(property, value),
      ),
    );

  getAllPaths = (id?: string) => {
    const mapRootElement = this.getMapRootElement();
    if (!mapRootElement) {
      return [];
    }

    return Array.from(
      mapRootElement.querySelectorAll(
        `[data-section-id${id ? `="${id}"` : ""}]`,
      ),
    ).reduce((memo, element) => {
      const children = element.querySelectorAll("path");
      return memo.concat(children.length ? Array.from(children) : [element]);
    }, [] as Element[]);
  };

  getAllPathsForZone = (id?: string) => {
    const mapRootElement = this.getMapRootElement();
    if (!mapRootElement) {
      return [];
    }

    const sections = this.state.manifest.sections;
    const zone: string = sections[id ?? ''].zone_name;
    var ids: string[] = [];

    Object.keys(sections).forEach(key => {
      if (sections[key].zone_name === zone) {
        ids.push(key);
      }
    });

    return Array.from(
      mapRootElement.querySelectorAll(
        `[data-section-id${ids.length > 0 ? `="${ids.join('"],[data-section-id="')}"` : ""}]`
      ),
    ).reduce((memo, element) => {
      const children = element.querySelectorAll("path");
      return memo.concat(children.length ? Array.from(children) : [element]);
    }, [] as Element[]);
  };

  /**
   * Helpers
   */

  clearSelection = () => {
    this.setState({
      selectedSections: new Set(),
    });
  };

  toggleSectionHighlight = (section?: string, shouldHighlight = true) => {
    if (!section) {
      return;
    }

    const sectionId = section;
    const isUnhighlightingSelectedSection =
      !shouldHighlight && this.state.selectedSections.has(sectionId);
    if (isUnhighlightingSelectedSection) {
      return;
    }

    return this.fillZone(sectionId, shouldHighlight);
  };


  toggleSectionSelect = (section?: string | null, shouldHighlight = true) => {
    if (!section) {
      return;
    }

    const sectionId = section;
    if (!$venueSections(this.state).includes(sectionId)) {
      return;
    }

    const selectedSections = new Set<string>();

    if (shouldHighlight) {
      const selectedZone = this.props.manifest.sections[section]?.zone_name;

      if (!selectedZone) {
        return;
      }

      for (const [key, section] of Object.entries(this.props.manifest.sections)) {
        if (section.zone_name === selectedZone) {
          selectedSections.add(key);
        }
      }
    }

    this.setState({ selectedSections });
  };

  updateMap() {
    this.fillUnavailableColors();
    $venueSections(this.state).forEach((section) => {
      this.fillZone(
        section,
        this.state.selectedSections.has(section),
      );
    });
  }

  fillZone(section: string, shouldHighlight = true) {
    const isAnAvailableSection = $venueSections(this.state).includes(section);
    if (isAnAvailableSection) {
      this.fillPathsForZone(
        () => ({
          fill: this.getDefaultColor(
            $ticketGroupsBySection(this.state)[section],
          ),
          //opacity: shouldHighlight ? "0.8" : "1",
          opacity: "1",
          "stroke-width": "1",
          stroke: shouldHighlight
            ? highlightedSectionColor
            : unhighlightedSectionColor,
          cursor: "pointer",
        }),
        section,
      );
    }
  }

  getSectionFromTarget(target?: HTMLElement | null) {
    if (!target) {
      return;
    }
    const element = target.closest("[data-section-id]");
    if (!element) {
      return;
    }

    const sectionId = element.getAttribute("data-section-id");
    if (!sectionId) {
      return;
    }

    return sectionId;
  }

  /**
   * Coloring
   */


  getDefaultColor(ticketGroups: TicketGroup[] = []): string {
    return ticketGroups[0].color;
  }

  /**
   * Interaction Callbacks
   */

  onMouseOver = ({
    clientX,
    clientY,
    target,
  }: React.MouseEvent<HTMLElement>) => {
    if (this.state.isTouchDevice) return;
    this.doHover(target as HTMLElement, clientX, clientY);
  };

  onMouseOut = ({ relatedTarget }: React.MouseEvent<HTMLElement>) => {
    if (this.state.isTouchDevice) return;
    this.doHoverCleanup(relatedTarget as HTMLElement);
  };

  onMouseMove = ({ nativeEvent }: React.MouseEvent<HTMLElement>) =>
    this.setState({
      tooltipX: nativeEvent.clientX,
      tooltipY: nativeEvent.clientY,
    });

  onClick = () => this.doSelect();

  onTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    const section = this.getSectionFromTarget(e.target as HTMLElement);
    if (section) {
      this.setState({
        currentHoveredSection: section,
      });
      this.highlightSection(section);
    }
  };

  onTouchMove = () => {
    this.setState({ dragging: true });
  };

  getZoneNameFromSection(section: string): string {
    return this.state.manifest.sections[section]?.zone_name ?? '';
  }

  onTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    const section = this.state.currentHoveredSection;
    if (section) {
      this.doSelect(section);
      this.setState({ currentHoveredSection: undefined, currentHoveredZone: undefined });
    }
    if (this.state.dragging) {
      e.preventDefault();
    }
    this.setState({ dragging: false });
  };

  /**
   * Interactions
   */

  doHover(target: HTMLElement, tooltipX?: number, tooltipY?: number) {
    const section = this.getSectionFromTarget(target);
    if (!section) {
      return;
    }

    if (!$venueSections(this.state).includes(section)) {
      return;
    }

    this.highlightSection(section);
    this.setState({
      tooltipActive: tooltipX !== undefined && tooltipY !== undefined,
      tooltipX: tooltipX !== undefined ? tooltipX : 0,
      tooltipY: tooltipY !== undefined ? tooltipY : 0,
      tooltipSectionName: this.state.sectionMapping[section].sectionName,
      tooltipZoneName: this.state.manifest.sections[section].zone_name,
      currentHoveredSection: section,
      currentHoveredZone: this.getZoneNameFromSection(section)
    });
  }

  doHoverCleanup(enteringElement: HTMLElement): void {
    const isEnteringText =
      !!enteringElement && enteringElement.nodeName.toLowerCase() === "text";
    if (isEnteringText) {
      return;
    }

    const enteringSection = this.getSectionFromTarget(enteringElement);
    const isEnteringTheSameSection =
      !!enteringSection && enteringSection === this.state.currentHoveredSection;
    if (isEnteringTheSameSection) {
      return;
    }

    this.setState({
      tooltipActive: false,
      currentHoveredSection: undefined,
      currentHoveredZone: undefined,
    });
  }

  // TBD
  doSelect(section = this.state.currentHoveredSection) {
    if (!section) {
      return;
    }
    this.toggleSectionSelect(
      section,
      !this.state.selectedSections.has(section),
    );
  }

  handleZoomIn = () => {
    if (this.zoom) {
      this.zoom.zoomIn(0.1);
    }
  };

  handleZoomOut = () => {
    if (this.zoom) {
      this.zoom.zoomOut(0.1);
    }
  };

  handleResetZoom = () => {
    if (this.zoom) {
      this.zoom.reset();
    }

    this.setState({
      selectedSections: new Set(),
    });
  };

  render() {
    if (this.state.mapNotFound) {
      return (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            fontFamily: "Nunito Sans",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
              flex: "1 0 30%",
            }}
          >
            {this.props.missingSeatMapLogo || <MissingSeatMapLogo />}
            <div
              style={{
                fontWeight: 400,
                fontSize: "1.2em",
              }}
            >
              Seating Chart Coming Soon
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={this.container}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onMouseMove={this.onMouseMove}
        onClick={this.onClick}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
        onTouchMove={this.onTouchMove}
        style={{
          position: "relative",
          fontFamily: this.props.mapFontFamily,
          height: "95%",
          width: "100%",
          pointerEvents: this.props.mouseControlEnabled ? "initial" : "none",
        }}
      >
        {!this.state.isTouchDevice && (
          <Tooltip
            isActive={this.state.tooltipActive}
            x={this.state.tooltipX}
            y={this.state.tooltipY}
            name={this.state.tooltipSectionName}
            zone={this.state.tooltipZoneName}
            color={
              this.state.currentHoveredSection
                ? this.getDefaultColor(
                  $ticketGroupsBySection(this.state)[
                  this.state.currentHoveredSection
                  ],
                )
                : ""
            }
            ticketGroups={$availableTicketGroups(this.state).filter(
              (ticketGroup) => ticketGroup.zone_name === this.state.currentHoveredZone,
            )}
          />
        )}
        <div
          ref={this.mapRoot}
          style={{
            cursor: "-webkit-grab",
            opacity: this.state.mapSvg ? 1 : 0,
          }}
        />
        {this.state.mapSvg && (
          <Actions
            onClearSelection={this.clearSelection}
            showLegend={this.props.showLegend}
            showLegendOpenAlwaysForDesktop={
              this.props.showLegendOpenAlwaysForDesktop
            }
            ticketGroups={this.props.ticketGroups}
            showControls={this.props.showControls}
            openLegendInitially={this.props.openLegendInitially}
            onZoomIn={this.handleZoomIn}
            onZoomOut={this.handleZoomOut}
            onResetZoom={this.handleResetZoom}
          />
        )}
        {this.state.isTouchDevice &&
          this.props.mouseControlEnabled &&
          this.props.showZoomHelper && <ZoomHelper />}
      </div>
    );
  }
}

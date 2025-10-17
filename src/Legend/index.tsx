import { Component, CSSProperties } from "react";
import Button from "./../Button";
import Swatch from "./swatch";
import { IconChevronDown } from "../icons/ChevronDown";
import { IconChevronUp } from "../icons/ChevronUp";
import type { TicketGroup } from "../types/TicketGroups";

export interface Props {
  isMobile?: boolean;
  showLegendOpenAlwaysForDesktop?: boolean;
  openLegendInitially?: boolean;
  ticketGroups: TicketGroup[];
}

interface State {
  isOpen: boolean;
  hovered: boolean;
}

const uniqueByZone = (groups: TicketGroup[]): TicketGroup[] => {
  const map = new Map<string, TicketGroup>();

  groups.forEach(group => {
    map.set(group.zone_name, group);
  });

  return Array.from(map.values());
};

export default class Legend extends Component<Props, State> {
  static defaultProps = {
    isMobile: false,
    showLegendOpenAlwaysForDesktop: false,
    openLegendInitially: false,
  };

  state = {
    isOpen: this.props.openLegendInitially || false,
    hovered: false,
  };

  containerStyle(): CSSProperties {
    return {
      position: "absolute",
      backgroundColor: "white",
      right: -2,
      border: "2px solid lightgray",
      borderRadius: "0 0 5px 5px",
      maxHeight: 400,
      overflowY: "auto",
      width: 300,
      padding: 8,
      zIndex: 1000,
    };
  }

  itemStyle(): CSSProperties {
    return {
      display: "flex",
      alignItems: "flex-start",
      gap: 8,
      marginBottom: 8,
      wordBreak: "break-word",
      textAlign: "left",
    };
  }

  textContainerStyle(): CSSProperties {
    return {
      flex: 1,
      whiteSpace: "normal",
      overflowWrap: "break-word",
    };
  }

  render() {
    const { isOpen, hovered } = this.state;
    const { ticketGroups, isMobile, showLegendOpenAlwaysForDesktop } = this.props;

    const filteredTicketGroups = uniqueByZone(ticketGroups);

    const content = (
      <div style={this.containerStyle()}>
        <h3 style={{ margin: 0, marginBottom: 8, fontWeight: 700 }}>Map Legend</h3>
        {filteredTicketGroups.map((ticketGroup) => (
          <div key={ticketGroup.color} style={this.itemStyle()}>
            <Swatch color={ticketGroup.color} />
            <div style={this.textContainerStyle()}>
              <strong>{ticketGroup.zone_name}</strong>
              {ticketGroup.description && ` - ${ticketGroup.description}`}
            </div>
          </div>
        ))}
      </div>
    );

    return showLegendOpenAlwaysForDesktop && !isMobile ? (
      <div style={{ position: "relative" }}>{content}</div>
    ) : (
      <div style={{ position: "relative" }}>
        <Button
          onClick={() => this.setState({ isOpen: !isOpen, hovered: true })}
          icon={isOpen ? <IconChevronUp /> : <IconChevronDown />}
          text={`${isOpen ? "Hide " : "Show "}Map Legend`}
          isMobile={isMobile}
          onMouseLeave={() => { this.setState({ hovered: false, isOpen: false }) }}
        />
        <div
          onMouseEnter={() => { this.setState({ hovered: true, isOpen: true }) }}
          onMouseLeave={() => { this.setState({ hovered: false, isOpen: false }) }}
        >
          {hovered && <>
            {filteredTicketGroups.length > 0 && isOpen && content}
          </>}
        </div>
      </div>
    );
  }
}

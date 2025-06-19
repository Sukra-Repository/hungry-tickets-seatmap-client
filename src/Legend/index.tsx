import { Component } from "react";
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
  };

  render() {
    const { isOpen } = this.state;
    const { ticketGroups, isMobile, showLegendOpenAlwaysForDesktop } = this.props;

    const filteredTicketGroups = uniqueByZone(ticketGroups);

    return showLegendOpenAlwaysForDesktop && !isMobile ? (
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            right: -2,
            border: "2px solid lightgray",
            borderRadius: "0 0 5px 5px",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          <h3 style={{ padding: "0 0 0 8px", textAlign: "left" }}>
            Map Legend
          </h3>
          {filteredTicketGroups.map((ticketGroup) => (
            <div key={ticketGroup.color} style={{ padding: 8, textAlign: "left" }}>
              <Swatch color={ticketGroup.color} style={{ marginRight: 8 }} />
              <span>
                {ticketGroup.zone_name}
                {" - "}
                {ticketGroup.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div style={{ position: "relative" }}>
        <Button
          onClick={() => this.setState({ isOpen: !isOpen })}
          icon={isOpen ? <IconChevronUp /> : <IconChevronDown />}
          text={`${isOpen ? "Hide " : "Show "}Map Legend`}
          isMobile={isMobile}
        />
        {filteredTicketGroups.length > 0 && isOpen && (
          <div
            style={{
              position: "absolute",
              backgroundColor: "white",
              right: -2,
              border: "2px solid lightgray",
              borderRadius: "0 0 5px 5px",
            }}
          >
            {filteredTicketGroups.map((ticketGroup) => (
            <div key={ticketGroup.color} style={{ padding: 8, textAlign: "left" }}>
              <Swatch color={ticketGroup.color} style={{ marginRight: 8 }} />
              <span>
                {ticketGroup.zone_name}
                {ticketGroup.description && ` - ${ticketGroup.description}`}
              </span>
            </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

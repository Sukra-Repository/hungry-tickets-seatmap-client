import React, { Component, type CSSProperties } from "react";
import type { TicketGroup } from "../types/TicketGroups";

export const defaultDirection = ["up", "right"];

export const formatCurrency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
}).format;

export interface Props {
  x?: number;
  y?: number;
  color?: string;
  isActive?: boolean;
  ticketGroups?: TicketGroup[];
  name?: string;
  zone?: string;
}

interface DefaultProps {
  x: number;
  y: number;
  color: string;
  isActive: boolean;
  ticketGroups: TicketGroup[];
  name: string;
  zone: string;
}

interface Point {
  x: number;
  y: number;
}

export default class Tooltip extends Component<Props & DefaultProps> {
  container = React.createRef<HTMLDivElement>();

  static defaultProps: DefaultProps = {
    isActive: false,
    ticketGroups: [],
    name: "",
    zone: "",
    x: 0,
    y: 0,
    color: "#000000",
  };

  direction(): string[] {
    const container = this.container.current;
    const { x, y } = this.props;
    const direction = [...defaultDirection];

    if (!container || !container.parentElement) {
      return direction;
    }

    // display to the left of the cursor when the right side of the tooltip is clipped
    if (x + container.clientWidth > container.parentElement.clientWidth) {
      direction[1] = "left";
    }

    // display beneath the cursor when the top of the tooltip is clipped
    if (y < container.clientHeight) {
      direction[0] = "down";
    }

    return direction;
  }

  position(): Point {
    const direction = this.direction();
    const point = {
      x: this.props.x,
      y: this.props.y,
    };

    const container = this.container.current;
    if (container) {
      if (direction[0] === "up") {
        point.y -= container.clientHeight;
      }

      if (direction[1] === "left") {
        point.x -= container.clientWidth;
      }
    }

    return point;
  }

  containerStyle(): CSSProperties {
    const { isActive } = this.props;
    const direction = this.direction();
    const position = this.position();

    return {
      position: "fixed",
      zIndex: 1,
      transition: "top .1s, left .1s",
      opacity: isActive ? 1 : 0,
      padding: 10,
      display: "flex",
      flexDirection: direction[0] === "down" ? "column" : "column-reverse",
      alignItems: direction[1] === "right" ? "flex-start" : "flex-end",
      filter: "drop-shadow(rgba(0, 0, 0, 0.5) 0 2px 2px)",
      pointerEvents: "none",
      top: position.y,
      left: position.x,
    };
  }

  swatchStyle(): CSSProperties {
    return {
      width: 16,
      height: 16,
      backgroundColor: this.props.color,
      display: "inline-block",
      marginRight: 5,
      borderRadius: 4,
    };
  }

  contentStyle(): CSSProperties {
    return {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 8,
    };
  }

  nameStyle(): CSSProperties {
    return {
      display: "flex",
      alignItems: "center",
    };
  }

  priceStyle(): CSSProperties {
    return {
      fontWeight: 700,
    };
  }

  render() {
    const prices = this.props.ticketGroups
      .map((ticketGroup) => ticketGroup.retail_price)
      .sort((a, b) => a - b);

    return (
      <div
        ref={this.container}
        style={this.containerStyle()}
        data-testid="seatmaps-tooltip"
      >
        <div style={this.contentStyle()}>
          <div style={this.nameStyle()}>
            <div style={this.swatchStyle()} />
            Section: {this.props.name}
            {", "}
            Zone: {this.props.zone}
          </div>
          <br></br>
          {prices[0] > 0.0 &&
            <div>
              {/* {this.props.ticketGroups.length} offer
              {prices.length !== 1 ? "s" : ""}
              {" ● "} */}
              Best Offer Price{" "}
              <span style={this.priceStyle()}>{formatCurrency(prices[prices.length - 1])}</span>
            </div>
          }
          {prices[0] === 0.0 &&
            <div>
              No offers yet. Be the first one to Name Your Price
            </div>
          }
        </div>
      </div>
    );
  }
}

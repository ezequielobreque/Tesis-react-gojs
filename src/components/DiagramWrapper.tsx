/*
 *  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
 */

import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import * as React from "react";

import { GuidedDraggingTool } from "../GuidedDraggingTool";

import "./Diagram.css";

interface DiagramProps {
  nodeDataArray: Array<go.ObjectData>;
  linkDataArray: Array<go.ObjectData>;
  modelData: go.ObjectData;
  skipsDiagramUpdate: boolean;
  onDiagramEvent: (e: go.DiagramEvent) => void;
  onModelChange: (e: go.IncrementalData) => void;
}

export class DiagramWrapper extends React.Component<DiagramProps, {}> {
  /**
   * Ref to keep a reference to the Diagram component, which provides access to the GoJS diagram via getDiagram().
   */
  private diagramRef: React.RefObject<ReactDiagram>;

  /** @internal */
  constructor(props: DiagramProps) {
    super(props);
    this.diagramRef = React.createRef();
  }

  /**
   * Get the diagram reference and add any desired diagram listeners.
   * Typically the same function will be used for each listener, with the function using a switch statement to handle the events.
   */
  public componentDidMount() {
    if (!this.diagramRef.current) return;
    const diagram = this.diagramRef.current.getDiagram();
    if (diagram instanceof go.Diagram) {
      diagram.addDiagramListener("ChangedSelection", this.props.onDiagramEvent);
    }
  }

  /**
   * Get the diagram reference and remove listeners that were added during mounting.
   */
  public componentWillUnmount() {
    if (!this.diagramRef.current) return;
    const diagram = this.diagramRef.current.getDiagram();
    if (diagram instanceof go.Diagram) {
      diagram.removeDiagramListener(
        "ChangedSelection",
        this.props.onDiagramEvent
      );
    }
  }

  /**
   * Diagram initialization method, which is passed to the ReactDiagram component.
   * This method is responsible for making the diagram and initializing the model, any templates,
   * and maybe doing other initialization tasks like customizing tools.
   * The model's data should not be set here, as the ReactDiagram component handles that.
   */
  private initDiagram(): go.Diagram {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram = $(go.Diagram, {
      "undoManager.isEnabled": true, // must be set to allow for model change listening
      // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
      "clickCreatingTool.archetypeNodeData": {
        text: "new node",
        color: "lightblue",
      },
      draggingTool: new GuidedDraggingTool(), // defined in GuidedDraggingTool.ts
      "draggingTool.horizontalGuidelineColor": "blue",
      "draggingTool.verticalGuidelineColor": "blue",
      "draggingTool.centerGuidelineColor": "green",
      "draggingTool.guidelineWidth": 1,
      layout: $(go.ForceDirectedLayout, { setsPortSpots: false, arrangementSpacing:new  go.Size(200,200) }),
      model: $(go.GraphLinksModel, {
        linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        // positive keys for nodes
        makeUniqueKeyFunction: (m: go.Model, data: any) => {
          let k = data.key || 1;
          while (m.findNodeDataForKey(k)) k++;
          data.key = k;
          return k;
        },
        // negative keys for links
        makeUniqueLinkKeyFunction: (m: go.GraphLinksModel, data: any) => {
          let k = data.key || -1;
          while (m.findLinkDataForKey(k)) k--;
          data.key = k;
          return k;
        },
      }),
    });

    // define a simple Node template

    function parseType(s: any) {
      switch (s) {
        case "H":
          return go.Panel.Horizontal;
        case "V":
          return go.Panel.Vertical;
        default:
          return go.Panel.Auto;
      }
    }
    function routingHandle(s: any) {
      switch (s) {
        case "N":
          return go.Link.Normal;

        case "A":
          return go.Link.AvoidsNodes;
        default:
          return go.Link.Normal;
      }
    }
    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      new go.Binding("type", "type", parseType),
      { background: "transparent" },
      new go.Binding("background", "background"), // the Shape will go around the TextBlock
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      $(
        go.Shape,
        {
          fill: "white",
          strokeWidth: 1,
          // set the port properties:
          portId: "",
          strokeJoin: "round",
          //, fromLinkable: true, toLinkable: true, cursor: 'pointer'x
        },
        // Shape.fill is bound to Node.data.color
        new go.Binding("fill", "color"),
        new go.Binding("figure", "fig"),
        new go.Binding("width", "width"),
        new go.Binding("height", "height")
      ),

      $(
        go.TextBlock,
        { margin: 8, editable: true, font: "400 .875rem Roboto, sans-serif" }, // some room around the text
        new go.Binding("text").makeTwoWay(),
        new go.Binding("margin")
      )
    );

    // relinking depends on modelData
    // diagram.linkTemplate =
    //   $(go.Link,
    //     new go.Binding('relinkableFrom', 'canRelink').ofModel(),
    //     new go.Binding('relinkableTo', 'canRelink').ofModel(),
    //     $(go.Shape),
    //     $(go.Shape, { toArrow: 'Standard' })
    //   );
    diagram.groupTemplate = $(
      go.Group,
      "Spot",
      { layout: $(go.CircularLayout, { spacing: 20, sweepAngle: 360 }) },
      $(go.Shape, "Circle", {
        fill: "transparent",
        opacity: 0,
        minSize: new go.Size(50, 50),
      }),
      $(
        go.Panel,
        "Auto",
        new go.Binding("type", "type", parseType),
        { background: "transparent" },
        new go.Binding("background", "background"), // the Shape will go around the TextBlock
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        $(
          go.Shape,
          {
            fill: "white",
            strokeWidth: 1,
            // set the port properties:
            portId: "",
            strokeJoin: "round",
            //, fromLinkable: true, toLinkable: true, cursor: 'pointer'x
          },
          // Shape.fill is bound to Node.data.color
          new go.Binding("fill", "color"),
          new go.Binding("figure", "fig"),
          new go.Binding("width", "width"),
          new go.Binding("height", "height")
        ),
        $(
          go.TextBlock,
          { margin: 8, editable: true, font: "400 .875rem Roboto, sans-serif" }, // some room around the text
          new go.Binding("text").makeTwoWay(),
          new go.Binding("margin")
        )
      )
    );

    diagram.linkTemplate = $(
      go.Link, // the whole link panel
      {
        selectionAdorned: true,
        layerName: "Foreground",
        reshapable: true,
        routing: go.Link.Orthogonal,
        corner: 10,
        angle: 360,
        curve: go.Link.JumpOver,
        segmentOrientation: go.Link.None,
      },
      new go.Binding("fromSpot", "fromSpot", go.Spot.parse),
      new go.Binding("toSpot", "toSpot", go.Spot.parse),
      //new go.Binding('segmentOrientation','seg'),
      new go.Binding("routing", "routing", routingHandle),
      $(go.Shape),
      $(
        go.Shape, // the link shape
        { stroke: "#303B45", strokeWidth: 2.5, toArrow: "" },
        new go.Binding("toArrow", "arrow")
      ),
      $(
        go.TextBlock, // the "from" label
        {
          textAlign: "center",
          font: "bold 14px sans-serif",
          stroke: "#1967B3",
          segmentIndex: 0,
          segmentOffset: new go.Point(NaN, NaN),
          segmentOrientation: go.Link.None,
          angle: 360,
        },
        new go.Binding("alignmentFocus", "align"),
        new go.Binding("text", "text")
      ),
      $(
        go.TextBlock, // the "to" label
        {
          textAlign: "center",
          font: "bold 14px sans-serif",
          stroke: "#1967B3",
          segmentIndex: -1,
          segmentOffset: new go.Point(NaN, NaN),
          segmentOrientation: go.Link.OrientUpright,
        },
        new go.Binding("text", "toText")
      )
    );

    return diagram;
  }

  public render() {
    return (
      <ReactDiagram
        ref={this.diagramRef}
        divClassName="diagram-component"
        initDiagram={this.initDiagram}
        nodeDataArray={this.props.nodeDataArray}
        linkDataArray={this.props.linkDataArray}
        modelData={this.props.modelData}
        onModelChange={this.props.onModelChange}
        skipsDiagramUpdate={this.props.skipsDiagramUpdate}
      />
    );
  }
}

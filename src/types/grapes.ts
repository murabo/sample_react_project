export type GrapesPluginType = string | CallableFunction;

export type BlockContentType = string | HTMLElement;

export interface ISector {
  name: string;
  buildProps: string[];
}

export interface IStyleManager {
  sectors: ISector[];
}


export interface ICustomAttributes {
  badgable: boolean;
  draggable: boolean;
  droppable: boolean;
  editable: boolean;
  content: string;
  component: object;
  'custom-name': string;
  highlightable: boolean;
  icon: string;
  layerable: boolean;
  open: boolean;
  removable: boolean;
  resizable: boolean;
  script: string;
}

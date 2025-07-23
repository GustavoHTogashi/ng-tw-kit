export type NgtwEventsPluginConfig = {
  delay?: number;
  separator?: string;
  validModifiers?: Modifiers;
};

export type Modifier =
  | 'capture'
  | 'debounce'
  | 'once'
  | 'passive'
  | 'prevent'
  | 'self'
  | 'stopimmediate'
  | 'stop'
  | 'throttle';

export type Modifiers = Modifier[];

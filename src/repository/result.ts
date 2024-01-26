export interface Result {
  error?: {
    message: string;
  };
}

export interface ObjectResult<T> extends Result {
  object?: T;
}

export interface ArrayResult<T> extends Result {
  array?: T[];
}

export interface BooleanResult extends Result {
  boolean?: boolean;
}

export interface StringResult extends Result {
  string?: string;
}

export interface NumberResult extends Result {
  number?: number;
}

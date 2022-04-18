export type AsyncIntervalOption<T> = {
  ms?: number;
  condition?: () => Promise<boolean>;
  maxCount?: number;
  errorMessage?: (result: T) => string;
};

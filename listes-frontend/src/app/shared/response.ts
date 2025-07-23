export interface Response {
    next: () => void;
    error: (error: unknown) => void;
}
export enum ActivityType {
    COMMENT = "comment",
    MEASURABLE_REPORT = "measurable-report",
    NON_MEASURABLE_REPORT = "nonmeasurable-report",
}

export interface Activity {
    id: number;
    type: ActivityType;
    author: string;
    progress?: number;
    content: string;
    created_at: string;
}
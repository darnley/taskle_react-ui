export interface IPerTaskStatus {
  status: string;
  count: number;
}

export interface IPerTaskComplexity {
  complexity: string;
  count: number;
}

export interface IPerKeyword {
  keyword: string;
  name: string;
  count: number;
}

export interface IProjectTaskCountStats {
  projectId: string;
  perTaskStatus: IPerTaskStatus[];
  perTaskComplexity: IPerTaskComplexity[];
  perKeywords: IPerKeyword[];
}

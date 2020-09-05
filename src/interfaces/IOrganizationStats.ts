export interface IOrganizationStatisticsTaskStatus {
  status: string;
  count: number;
}

export interface IOrganizationStatisticsTaskComplexity {
  complexity: string;
  count: number;
}

export interface IOrganizationStatisticsPerKeywords {
  keyword: string;
  name: string;
  count: number;
}

export interface IOrganizationStatistics {
  perTaskStatus: IOrganizationStatisticsTaskStatus[];
  perTaskComplexity: IOrganizationStatisticsTaskComplexity[];
  perKeywords: IOrganizationStatisticsPerKeywords[];
}

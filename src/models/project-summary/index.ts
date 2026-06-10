/** Portfolio-level aggregate stats across all CaaS deployments. */
export interface ProjectSummary {
  totalProjects: number;
  /** Total chilled-water capacity under management (TR). */
  totalCapacityTr: number;
  /** Total verified energy saved per year (GWh). */
  totalEnergySavedGwh: number;
  /** Average verified savings across the portfolio (%). */
  avgSavingsPct: number;
}

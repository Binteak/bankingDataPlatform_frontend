import { MockRiskExposure } from './mock-data.service';

export const MOCK_INITIAL_DATA: MockRiskExposure[] = [

  {
    id: 1,
    reportingDate: '2022-09-30',
    entityId: 'ENT-PE-2201',
    entityName: 'Andes Mining',
    country: 'PE',
    portfolio: 'CORPORATE',
    productType: 'LOAN',
    exposureAmount: 1850000,
    eadAmount: 1720000,
    pd: 0.031,
    lgd: 0.41,
    riskStage: 'STAGE_2',
    rating: 'BBB',
    defaultFlag: false,
    defaultDate: null,
    currency: 'PEN',
    dataSource: 'RISK_ENGINE'
  },

  {
    id: 2,
    reportingDate: '2022-09-30',
    entityId: 'ENT-PE-2202',
    entityName: 'Lima Services',
    country: 'PE',
    portfolio: 'SME',
    productType: 'LOAN',
    exposureAmount: 420000,
    eadAmount: 400000,
    pd: 0.018,
    lgd: 0.35,
    riskStage: 'STAGE_1',
    rating: 'A',
    defaultFlag: false,
    defaultDate: null,
    currency: 'PEN',
    dataSource: 'CORE_BANKING'
  },

  {
    id: 3,
    reportingDate: '2022-09-30',
    entityId: 'ENT-PE-2203',
    entityName: 'Pacific Retail',
    country: 'PE',
    portfolio: 'RETAIL',
    productType: 'MORTGAGE',
    exposureAmount: 315000,
    eadAmount: 305000,
    pd: 0.009,
    lgd: 0.28,
    riskStage: 'STAGE_1',
    rating: 'AA',
    defaultFlag: false,
    defaultDate: null,
    currency: 'PEN',
    dataSource: 'CORE_BANKING'
  },

  {
    id: 4,
    reportingDate: '2022-09-30',
    entityId: 'ENT-PE-2204',
    entityName: 'Inca Logistics',
    country: 'PE',
    portfolio: 'SME',
    productType: 'LOAN',
    exposureAmount: 690000,
    eadAmount: 650000,
    pd: 0.045,
    lgd: 0.45,
    riskStage: 'STAGE_2',
    rating: 'BBB',
    defaultFlag: false,
    defaultDate: null,
    currency: 'PEN',
    dataSource: 'RISK_ENGINE'
  },

  {
    id: 5,
    reportingDate: '2022-09-30',
    entityId: 'ENT-PE-2205',
    entityName: 'Peru Energy',
    country: 'PE',
    portfolio: 'CORPORATE',
    productType: 'CREDIT_LINE',
    exposureAmount: 2450000,
    eadAmount: 2300000,
    pd: 0.027,
    lgd: 0.39,
    riskStage: 'STAGE_2',
    rating: 'BBB',
    defaultFlag: false,
    defaultDate: null,
    currency: 'PEN',
    dataSource: 'CORE_BANKING'
  }

];
import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  of
} from 'rxjs';

import {
  environment
} from '../../../environments/environment';

import {
  MockDataStoreService
} from '../../service/mock-data.service';


@Injectable({
  providedIn: 'root'
})
export class DataQualityService {


  private apiUrl =
    environment.apiUrl + 'dataQuality/';


  constructor(
    private http: HttpClient,
    private mockStore: MockDataStoreService
  ) {}


  // ==========================================================
  // GET AVAILABLE DATASETS
  // ==========================================================

  getDatasets(): Observable<any> {


    // ========================================================
    // MOCK MODE
    // ========================================================

    if (environment.useMockData) {


      const data =
        this.mockStore.getData();


      // ------------------------------------------------------
      // GROUP DATA BY COUNTRY
      // ------------------------------------------------------

      const grouped =
        new Map<string, Set<string>>();


      data.forEach(record => {


        if (!record.country) {

          return;

        }


        if (!grouped.has(record.country)) {

          grouped.set(
            record.country,
            new Set<string>()
          );

        }


        if (record.reportingDate) {

          grouped
            .get(record.country)!
            .add(record.reportingDate);

        }

      });


      // ------------------------------------------------------
      // CONVERT TO COMPONENT STRUCTURE
      //
      // {
      //   country: 'Spain',
      //   dates: [
      //     '2025-01-31',
      //     '2025-02-28'
      //   ]
      // }
      // ------------------------------------------------------

      const datasets =
        Array.from(
          grouped.entries()
        )
        .map(
          ([country, dates]) => ({

            country:

              country,

            dates:

              Array.from(dates)
                .sort()

          })
        );


      // ------------------------------------------------------
      // RETURN SAME STRUCTURE EXPECTED BY COMPONENT
      // ------------------------------------------------------

      return of({

        status:
          'success',

        datasets:

          datasets

      });

    }


    // ========================================================
    // REAL BACKEND
    // ========================================================

    return this.http.get(
      this.apiUrl
    );

  }


  // ==========================================================
  // RUN DATA QUALITY CHECKS
  // ==========================================================

  runChecks(
    country: string,
    reportingDate: string
  ): Observable<any> {


    // ========================================================
    // MOCK MODE
    // ========================================================

    if (environment.useMockData) {


      // ------------------------------------------------------
      // GET DATA
      // ------------------------------------------------------

      let data =
        this.mockStore.getData();


      // ------------------------------------------------------
      // FILTER COUNTRY
      // ------------------------------------------------------

      data =
        data.filter(
          record =>
            record.country === country
        );


      // ------------------------------------------------------
      // FILTER REPORTING DATE
      // ------------------------------------------------------

      data =
        data.filter(
          record =>
            record.reportingDate === reportingDate
        );


      // ======================================================
      // RESULTS
      // ======================================================

      const results: any[] = [];


      // ======================================================
      // CHECK 1 — COMPLETENESS
      // ======================================================

      let missingFields = 0;


      data.forEach(record => {


        const fields = [

          record.entityId,

          record.entityName,

          record.country,

          record.portfolio,

          record.productType,

          record.exposureAmount,

          record.eadAmount,

          record.pd,

          record.lgd,

          record.riskStage,

          record.rating,

          record.currency,

          record.dataSource

        ];


        fields.forEach(value => {

          if (
            value === null ||
            value === undefined ||
            value === ''
          ) {

            missingFields++;

          }

        });

      });


      const completenessPassed =
        missingFields === 0;


      results.push({

        check:
          'Completeness',

        status:
          completenessPassed
            ? 'PASSED'
            : 'FAILED',

        passed:
          completenessPassed,

        details:
          completenessPassed

            ? 'All required fields are populated.'

            : `${missingFields} missing values found.`

      });


      // ======================================================
      // CHECK 2 — DUPLICATES
      // ======================================================

      const ids =
        data.map(
          record =>
            record.id
        );


      const uniqueIds =
        new Set(ids);


      const duplicateCount =
        ids.length -
        uniqueIds.size;


      const duplicatesPassed =
        duplicateCount === 0;


      results.push({

        check:
          'Duplicate Records',

        status:
          duplicatesPassed
            ? 'PASSED'
            : 'FAILED',

        passed:
          duplicatesPassed,

        details:
          duplicatesPassed

            ? 'No duplicate record IDs found.'

            : `${duplicateCount} duplicate records found.`

      });


      // ======================================================
      // CHECK 3 — EXPOSURE AMOUNT
      // ======================================================

      const invalidExposure =
        data.filter(
          record =>
            record.exposureAmount === null ||
            record.exposureAmount === undefined ||
            record.exposureAmount < 0
        ).length;


      const exposurePassed =
        invalidExposure === 0;


      results.push({

        check:
          'Exposure Amount',

        status:
          exposurePassed
            ? 'PASSED'
            : 'FAILED',

        passed:
          exposurePassed,

        details:
          exposurePassed

            ? 'Exposure amounts are valid.'

            : `${invalidExposure} invalid exposure amounts found.`

      });


      // ======================================================
      // CHECK 4 — EAD
      // ======================================================

      const invalidEad =
        data.filter(
          record =>
            record.eadAmount === null ||
            record.eadAmount === undefined ||
            record.eadAmount < 0
        ).length;


      const eadPassed =
        invalidEad === 0;


      results.push({

        check:
          'EAD Amount',

        status:
          eadPassed
            ? 'PASSED'
            : 'FAILED',

        passed:
          eadPassed,

        details:
          eadPassed

            ? 'EAD amounts are valid.'

            : `${invalidEad} invalid EAD amounts found.`

      });


      // ======================================================
      // CHECK 5 — PD
      // ======================================================

      const invalidPd =
        data.filter(
          record =>
            record.pd === null ||
            record.pd === undefined ||
            record.pd < 0 ||
            record.pd > 1
        ).length;


      const pdPassed =
        invalidPd === 0;


      results.push({

        check:
          'Probability of Default',

        status:
          pdPassed
            ? 'PASSED'
            : 'FAILED',

        passed:
          pdPassed,

        details:
          pdPassed

            ? 'PD values are within the expected range.'

            : `${invalidPd} invalid PD values found.`

      });


      // ======================================================
      // CHECK 6 — LGD
      // ======================================================

      const invalidLgd =
        data.filter(
          record =>
            record.lgd === null ||
            record.lgd === undefined ||
            record.lgd < 0 ||
            record.lgd > 1
        ).length;


      const lgdPassed =
        invalidLgd === 0;


      results.push({

        check:
          'Loss Given Default',

        status:
          lgdPassed
            ? 'PASSED'
            : 'FAILED',

        passed:
          lgdPassed,

        details:
          lgdPassed

            ? 'LGD values are within the expected range.'

            : `${invalidLgd} invalid LGD values found.`

      });


      // ======================================================
      // CHECK 7 — DEFAULT CONSISTENCY
      // ======================================================

      const inconsistentDefaults =
        data.filter(record => {


          if (record.defaultFlag) {

            return !record.defaultDate;

          }


          return false;

        }).length;


      const defaultPassed =
        inconsistentDefaults === 0;


      results.push({

        check:
          'Default Consistency',

        status:
          defaultPassed
            ? 'PASSED'
            : 'FAILED',

        passed:
          defaultPassed,

        details:
          defaultPassed

            ? 'Default flags and dates are consistent.'

            : `${inconsistentDefaults} inconsistent default records found.`

      });


      // ======================================================
      // SUMMARY
      // ======================================================

      const checksExecuted =
        results.length;


      const checksPassed =
        results.filter(
          result =>
            result.passed
        ).length;


      const checksFailed =
        checksExecuted -
        checksPassed;


      const recordsChecked =
        data.length;


      const qualityScore =
        checksExecuted > 0

          ? (
              checksPassed /
              checksExecuted
            ) * 100

          : 100;


      // ======================================================
      // RETURN BACKEND-COMPATIBLE RESPONSE
      // ======================================================

      return of({

        status:
          'success',


        summary: {

          recordsChecked:
            recordsChecked,

          checksExecuted:
            checksExecuted,

          checksPassed:
            checksPassed,

          checksFailed:
            checksFailed,

          qualityScore:
            Number(
              qualityScore.toFixed(2)
            )

        },


        results:
          results

      });

    }


    // ========================================================
    // REAL BACKEND
    // ========================================================

    return this.http.post(

      this.apiUrl,

      {

        country:
          country,

        reporting_date:
          reportingDate

      }

    );

  }

}
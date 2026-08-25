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
    // GET DATA FROM MOCK STORE
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
    // NUMBER OF RECORDS
    // ======================================================

    const records =
      data.length;


    // ======================================================
    // CONTROL 1
    // MISSING ENTITY ID
    // ======================================================

    const missingEntityId =
      data.filter(
        record =>
          !record.entityId ||
          record.entityId.trim() === ''
      ).length;


    // ======================================================
    // CONTROL 2
    // INVALID PD
    // ======================================================

    const invalidPd =
      data.filter(
        record =>
          record.pd === null ||
          record.pd === undefined ||
          record.pd < 0 ||
          record.pd > 1
      ).length;


    // ======================================================
    // CONTROL 3
    // INVALID LGD
    // ======================================================

    const invalidLgd =
      data.filter(
        record =>
          record.lgd === null ||
          record.lgd === undefined ||
          record.lgd < 0 ||
          record.lgd > 1
      ).length;


    // ======================================================
    // CONTROL 4
    // DEFAULT CONSISTENCY
    // ======================================================

    const inconsistentDefaults =
      data.filter(record => {

        // Default = true → debe existir fecha

        if (
          record.defaultFlag === true &&
          !record.defaultDate
        ) {

          return true;

        }


        // Default = false → no debería existir fecha

        if (
          record.defaultFlag === false &&
          record.defaultDate
        ) {

          return true;

        }


        return false;

      }).length;


    // ======================================================
    // CONTROL 5
    // EAD GREATER THAN EXPOSURE
    // ======================================================

    const invalidEad =
      data.filter(
        record =>
          record.eadAmount >
          record.exposureAmount
      ).length;


    // ======================================================
    // RESULTS
    // ======================================================

    const results = [

      // ----------------------------------------------------
      // MISSING ENTITY ID
      // ----------------------------------------------------

      {

        control:
          'Missing Entity ID',

        description:
          'Validates that every exposure contains a valid entity identifier.',

        status:
          missingEntityId === 0
            ? 'PASSED'
            : 'FAILED',

        records:
          records,

        failed:
          missingEntityId,

        execution:
          new Date().toISOString(),

        details:
          missingEntityId === 0

            ? 'No missing entity identifiers detected.'

            : `${missingEntityId} missing entity identifiers detected.`

      },


      // ----------------------------------------------------
      // INVALID PD
      // ----------------------------------------------------

      {

        control:
          'Invalid PD',

        description:
          'Validates that Probability of Default is between 0 and 1.',

        status:
          invalidPd === 0
            ? 'PASSED'
            : 'FAILED',

        records:
          records,

        failed:
          invalidPd,

        execution:
          new Date().toISOString(),

        details:
          invalidPd === 0

            ? 'All PD values are within the expected range.'

            : `${invalidPd} invalid PD values detected.`

      },


      // ----------------------------------------------------
      // INVALID LGD
      // ----------------------------------------------------

      {

        control:
          'Invalid LGD',

        description:
          'Validates that Loss Given Default is between 0 and 1.',

        status:
          invalidLgd === 0
            ? 'PASSED'
            : 'FAILED',

        records:
          records,

        failed:
          invalidLgd,

        execution:
          new Date().toISOString(),

        details:
          invalidLgd === 0

            ? 'All LGD values are within the expected range.'

            : `${invalidLgd} invalid LGD values detected.`

      },


      // ----------------------------------------------------
      // DEFAULT CONSISTENCY
      // ----------------------------------------------------

      {

        control:
          'Default Consistency',

        description:
          'Validates consistency between default status and default date.',

        status:
          inconsistentDefaults === 0
            ? 'PASSED'
            : 'FAILED',

        records:
          records,

        failed:
          inconsistentDefaults,

        execution:
          new Date().toISOString(),

        details:
          inconsistentDefaults === 0

            ? 'Default status and dates are consistent.'

            : `${inconsistentDefaults} inconsistent default records.`

      },


      // ----------------------------------------------------
      // EAD GREATER THAN EXPOSURE
      // ----------------------------------------------------

      {

        control:
          'EAD Greater Than Exposure',

        description:
          'Validates that Exposure at Default does not exceed total exposure.',

        status:
          invalidEad === 0
            ? 'PASSED'
            : 'FAILED',

        records:
          records,

        failed:
          invalidEad,

        execution:
          new Date().toISOString(),

        details:
          invalidEad === 0

            ? 'All EAD values are within the exposure limit.'

            : `${invalidEad} invalid EAD values detected.`

      }

    ];


    // ======================================================
    // SUMMARY
    // ======================================================

    const checksExecuted =
      results.length;


    const checksPassed =
      results.filter(
        result =>
          result.status === 'PASSED'
      ).length;


    const checksFailed =
      results.filter(
        result =>
          result.status === 'FAILED'
      ).length;


    const qualityScore =
      checksExecuted > 0

        ? (
            checksPassed /
            checksExecuted
          ) * 100

        : 100;


    // ======================================================
    // RESPONSE
    // ======================================================

    return of({

      status:
        'success',

      summary: {

        recordsChecked:
          records,

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
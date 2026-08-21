import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { ProcessVisualizationService } from '../../service/process-visualization.service';

@Component({
  selector: 'app-process-visualization',
  templateUrl: './process-visualization.component.html',
  styleUrls: ['./process-visualization.component.css']
})
export class ProcessVisualizationComponent implements OnInit {
    processId: string | null = null;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                // private _api: ProcessVisualizationService
    ) { }

    ngOnInit(): void {
       
        // Aquí puedes usar el processId para cargar los datos del proceso
    }
}
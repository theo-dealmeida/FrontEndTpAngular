import {Component, OnInit, ViewChild} from '@angular/core';
import {AssignmentsService} from '../shared/assignments.service';
import {Assignment} from './assignment.model';
import {MatieresService} from "../shared/matieres.service";
import {Matiere} from "./matieres/matiere.model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  displayedColumns: string[] = ['Assignement', 'Matière', 'Rendu', 'Date', 'Commentaires', 'Note'];

  assignments: Assignment[] = [];

  page: number = 1;
  limit: number = 10;

  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent | undefined;

  matieres: Matiere[] = []
  dataSource: MatTableDataSource<Assignment> = new MatTableDataSource();

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(public assignmentService: AssignmentsService, public matiereService: MatieresService) {
  }

  ngOnInit(): void {
    this.getMatieres();
    this.getAssignments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAssignments() {
    this.assignmentService.getAssignments().subscribe((data) => {
      this.dataSource.data = data
    });
  }

  getMatieres() {
    this.matiereService.getMatieres().subscribe((data) => {
      this.matieres = data;
      console.log(this.matieres);
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }
}

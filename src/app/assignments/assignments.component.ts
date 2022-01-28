import {Component, OnInit, ViewChild} from '@angular/core';
import {AssignmentsService} from '../shared/assignments.service';
import {Assignment} from './assignment.model';
import {MatieresService} from "../shared/matieres.service";
import {Matiere} from "./matieres/matiere.model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ElevesService} from "../shared/eleves.service";
import {Eleve} from "./eleves/eleve.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AssignmentsComponent implements OnInit {
  columnsToDisplay: string[] = ['nom', 'idEleve', 'idMatiere', 'rendu', 'dateDeRendu', 'commentaires', 'note'];

  assignments: Assignment[] = [];

  page: number = 1;
  limit: number = 10;

  rendu: boolean = false;
  nonRendu: boolean = false;

  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent | undefined;

  matieres: Matiere[] = []
  eleves: Eleve[] = []

  dataSource: MatTableDataSource<Assignment> = new MatTableDataSource();

  expandedAssignment: Assignment | null | undefined;

  isLoadingResults = true;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public assignmentService: AssignmentsService, public matiereService: MatieresService, public eleveService: ElevesService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getMatieres();
    this.getEleves();
    this.getAssignments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.nom.toLowerCase().includes(filter) || String(data.rendu).includes(filter.toString());
    };
  }

  getAssignments() {
    this.assignmentService.getAssignments().subscribe((data) => {
      this.dataSource.data = data
    });
  }

  getMatieres() {
    this.matiereService.getMatieres().subscribe((data) => {
      this.matieres = data;
    });
  }

  getEleves() {
    this.eleveService.getEleves().subscribe((data) => {
      this.eleves = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  upateRenduTable() {
    if (this.rendu && this.nonRendu || !this.rendu && !this.nonRendu) {
      this.dataSource.filter = '';
      this.openSnackBar('Affichage de tous les Assignments', 'Compris!')
    } else if (this.rendu && !this.nonRendu) {
      this.dataSource.filter = 'true';
      this.openSnackBar('Affichage des Assignments rendus', 'Compris!')
    } else {
      this.dataSource.filter = 'false';
      this.openSnackBar('Affichage des Assignments non rendus', 'Compris!')
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

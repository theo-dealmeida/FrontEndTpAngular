import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {Assignment} from '../assignments/assignment.model';
import {LoggingService} from './logging.service';
import {bdInitialAssignments} from './data';
import {SortDirection} from "@angular/material/sort";

@Injectable({
  providedIn: 'root'
})

export class AssignmentsService {
  assignments: Assignment[] = [];

  constructor(private loggingService: LoggingService,
              private http: HttpClient) {
  }

  url = "https://back-angular2022.herokuapp.com/api/assignments";


  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url);
  }

  getAssignmentsPagine(sort: string, order: SortDirection, page: number): Observable<any> {
    return this.http.get<any>(`${this.url}?&sort=${sort}&order=${order}&page=${
      page
    }`);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(this.url + "/" + id);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment.nom, "ajouté");

    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete(this.url + "/" + assignment._id);
  }

  peuplerBD() {
    bdInitialAssignments.forEach(assignment => {
      const a = new Assignment();

      a.nom = assignment.nom;
      a.dateDeRendu = new Date(assignment.dateDeRendu);
      a.note = assignment.note;
      a.rendu = assignment.rendu;
      a.commentaires = assignment.remarques;
      a.id = assignment.id;
      a.idMatiere = assignment.idMatiere;
      a.idEleve = assignment.idEleve

      this.addAssignment(a)
        .subscribe(reponse => {
          console.log(assignment.nom + " inséré dans la BD");
        })
    })
  }

  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment: any = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }

}

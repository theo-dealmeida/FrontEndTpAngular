import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoggingService} from './logging.service';
import {bdInitialMatieres} from './data';
import {Matiere} from "../assignments/matieres/matiere.model";

@Injectable({
  providedIn: 'root'
})

export class MatieresService {
  matieres: Matiere[] = [];

  constructor(private loggingService: LoggingService,
              private http:HttpClient) { }

  url = "https://back-angular2022.herokuapp.com//api/matieres";

  getMatieres():Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.url);
  }

  getMatierePagine(page:number, limit:number):Observable<any> {
    return this.http.get<any>(`${this.url}?page=${page}&limit=${limit}`);
  }

  getMatiere(id:number):Observable<Matiere|undefined> {
    return this.http.get<Matiere>(this.url + "/" + id);
  }

  addMatiere(matiere:Matiere):Observable<any>{

    this.loggingService.log(matiere.name, "ajouté");

    return this.http.post<Matiere>(this.url, matiere);
  }

  updateMatiere(matiere:Matiere):Observable<any> {
    return this.http.put<Matiere>(this.url, matiere);
  }

  deleteAssignment(matiere:Matiere):Observable<any> {
    return this.http.delete(this.url + "/" + matiere._id);
  }

  peuplerBD() {
    bdInitialMatieres.forEach(matiere => {
      const m = new Matiere();

      m.name = matiere.name;
      m.imageMatiere = matiere.imageMatiere;
      m.photoProf = matiere.photoProf;
      m.id = matiere.id;

      this.addMatiere(m)
        .subscribe(reponse => {
          console.log(matiere.name + " inséré dans la BD");
        })
    })
  }

}

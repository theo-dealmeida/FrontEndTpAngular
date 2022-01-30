import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoggingService} from './logging.service';
import {bdInitialEleves} from './data';
import {Eleve} from "../assignments/eleves/eleve.model";

@Injectable({
  providedIn: 'root'
})

export class ElevesService {
  eleves: Eleve[] = [];

  constructor(private loggingService: LoggingService,
              private http:HttpClient) { }

  url = "https://back-angular2022.herokuapp.com//api/eleves";

  getEleves():Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.url);
  }

  getEleve(id:number):Observable<Eleve|undefined> {
    return this.http.get<Eleve>(this.url + "/" + id);
  }

  addEleve(eleve:Eleve):Observable<any>{

    this.loggingService.log(eleve.name, "ajouté");

    return this.http.post<Eleve>(this.url, eleve);
  }

  updateEleve(eleve:Eleve):Observable<any> {
    return this.http.put<Eleve>(this.url, eleve);
  }

  deleteEleve(eleve:Eleve):Observable<any> {
    return this.http.delete(this.url + "/" + eleve._id);
  }

  peuplerBD() {
    bdInitialEleves.forEach(eleve => {
      const m = new Eleve();

      m.name = eleve.name;
      m.id = eleve.id;

      this.addEleve(m)
        .subscribe(reponse => {
          console.log(eleve.name + " inséré dans la BD");
        })
    })
  }

}

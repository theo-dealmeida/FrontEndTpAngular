import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {MatieresService} from "../../shared/matieres.service";
import {Matiere} from "../matieres/matiere.model";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  // associées au champs input du formulaire
  nomDevoir = "";
  dateDeRendu!:Date;

  matiereSelected = "";

  matieres: Matiere[] = []

  constructor(private assignmentService:AssignmentsService,
    private router:Router, public matiereService: MatieresService) { }

  ngOnInit(): void {
    this.getMatieres();
  }

  onSubmit() {
    console.log("NOM = " + this.nomDevoir);
    console.log("DATE = " + this.dateDeRendu);

    const newAssignment = new Assignment();
    newAssignment.id = Math.round(Math.random()*100000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    for (let matiere of this.matieres) {
      if (matiere.name === this.matiereSelected) {
        newAssignment.idMatiere = matiere.id!;
      }
    }

    this.assignmentService.addAssignment(newAssignment)
    .subscribe(reponse => {
      console.log(reponse.message);
      // maintenant il faut qu'on affiche la liste !!!
      this.router.navigate(["/home"]);
    });
  }

  getMatieres() {
    this.matiereService.getMatieres().subscribe((data) => {
      this.matieres = data;
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AssignmentsService} from 'src/app/shared/assignments.service';
import {Assignment} from '../assignment.model';
import {MatieresService} from "../../shared/matieres.service";
import {Matiere} from "../matieres/matiere.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class AddAssignmentComponent implements OnInit {

  // associées au champs input du formulaire
  nomDevoir = "";
  dateDeRendu!: Date;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;


  matiereSelected = "";

  matieres: Matiere[] = []

  constructor(private assignmentService: AssignmentsService,
              private router: Router, public matiereService: MatieresService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
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
      this.openSnackBar("Assignment ajouté", "Fermer");
    }, error => {
      this.openSnackBar("Une erreur est survenue. Veuillez réessayer", "Fermer");
    });
  }

  getMatieres() {
    this.matiereService.getMatieres().subscribe((data) => {
      this.matieres = data;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

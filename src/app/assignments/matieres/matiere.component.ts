import {Component, Input, OnInit} from "@angular/core";
import {MatieresService} from "../../shared/matieres.service";
import {Matiere} from "./matiere.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css'],
})
export class MatiereComponent implements OnInit {

  matiereTransmise?:Matiere;

  constructor(public matiereService: MatieresService,  private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getMatiere()
  }

  getMatiere() {
    const id:number = +this.route.snapshot.params['id'];
    console.log("ID = " + id);

    this.matiereService.getMatiere(id)
      .subscribe(matiere => {
        this.matiereTransmise = matiere;
      })
  }

}

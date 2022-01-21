import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';
import {User} from "../../shared/user/User";

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?:Assignment;
  isAdmin? : boolean;
  currentUser: User = new User();

  constructor(private assignmentService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router,
              private authService:AuthService) { }

  ngOnInit(): void {
    console.log("DANS COMPOSANT DETAIL")

    if (this.authService.loggedIn) {
      this.authService.getUserProfile().subscribe(res => {
        this.authService.currentUser = res;
        console.log(this.authService.currentUser)
        this.checkAdmin();
      })
    }

    this.getAssignment();
  }

  getAssignment() {
    // on récupère l'id dans l'URL
    // le + force la conversion de string à number
    const id:number = +this.route.snapshot.params['id'];
    console.log("ID = " + id);

    this.assignmentService.getAssignment(id)
    .subscribe(assignment => {
      // on utilise this.assignmentTransmis puisque c'est la propriété
      // utilisée dans le template HTML
      this.assignmentTransmis = assignment;
    })

  }
  onAssignmentRendu() {
    this.assignmentTransmis!.rendu = true;

    if(this.assignmentTransmis) {
      this.assignmentService.updateAssignment(this.assignmentTransmis)
      .subscribe(reponse => {
        console.log(reponse.message);
        // on est dans le subscribe, on est sur que la base de données a été
        // mise à jour....
        this.router.navigate(["/home"]);
      })
      // PAS BON SI ICI car on n'a pas la garantie que les données ont été updatées
      // this.router.navigate(["/home"]);
    }
  }

  onDeleteAssignment() {
    if(this.assignmentTransmis) {
      this.assignmentService.deleteAssignment(this.assignmentTransmis)
      .subscribe(reponse => {
        console.log(reponse.message);

        // pour faire disparaitre la boite qui affiche le détail
        this.assignmentTransmis = undefined;

        // on affiche liste. Comme on est dans le subscribe, on est sur
        // que les données sont à jour et que l'assignment a été supprimé !
        this.router.navigate(["/home"]);
      })
    }
  }

  onClickEdit() {
    // correspond à /assignment/1/edit?nom=Buffa&prenom=Michel#edit
    this.router.navigate(['/assignment', this.assignmentTransmis?.id, 'edit'],
                        {
                          queryParams: {
                            nom:'Buffa',
                            prenom:'Michel'
                        },
                          fragment:'edit'
                      });
  }

  checkAdmin() {
    this.authService.isAdmin().then( res => {
      this.isAdmin = res;
    })
  }
}

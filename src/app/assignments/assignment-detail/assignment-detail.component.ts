import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AssignmentsService} from 'src/app/shared/assignments.service';
import {AuthService} from 'src/app/shared/auth.service';
import {Assignment} from '../assignment.model';
import {User} from "../../shared/user/User";
import {MatieresService} from "../../shared/matieres.service";
import {Matiere} from "../matieres/matiere.model";

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?:Assignment;
  isAdmin? : boolean;
  currentUser: User = new User();

  matieres: Matiere[] = []

  constructor(private assignmentService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router,
              private authService:AuthService,
              public  matiereService: MatieresService) { }

  ngOnInit(): void {
    console.log("DANS COMPOSANT DETAIL")

    if (this.authService.loggedIn) {
      this.authService.getUserProfile().subscribe(res => {
        this.authService.currentUser = res;
        console.log(this.authService.currentUser)
        this.checkAdmin();
      })
    }
    this.getMatieres()
    this.getAssignment();
  }

  getAssignment() {
    const id:number = +this.route.snapshot.params['id'];
    console.log("ID = " + id);

    this.assignmentService.getAssignment(id)
    .subscribe(assignment => {
      this.assignmentTransmis = assignment;
    })
  }

  getMatieres() {
    this.matiereService.getMatieres().subscribe((data) => {
      this.matieres = data;
    });
  }

  onAssignmentRendu() {
    this.assignmentTransmis!.rendu = true;

    if(this.assignmentTransmis) {
      this.assignmentService.updateAssignment(this.assignmentTransmis)
      .subscribe(reponse => {
        console.log(reponse.message);

        this.router.navigate(["/home"]);
      })
    }
  }

  onDeleteAssignment() {
    if(this.assignmentTransmis) {
      this.assignmentService.deleteAssignment(this.assignmentTransmis)
      .subscribe(reponse => {
        console.log(reponse.message);

        this.assignmentTransmis = undefined;

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

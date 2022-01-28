export class Assignment {
  nom!:string;
  dateDeRendu!:Date;
  note!: number | null;
  rendu!:boolean;
  commentaires!:string;
  idMatiere!: number;
  idEleve!: number;
  id?:number;
  _id?:string;
}

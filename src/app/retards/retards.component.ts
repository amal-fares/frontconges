import {Component, OnInit} from '@angular/core';
import {UserserviceService} from "../userservice/userservice.service";
import {SharedserviceService} from "../sharedservie/sharedservice.service";
import {DemandestotalComponent} from "../demandestotal/demandestotal.component";
import {Type_Conge} from "../Models/Type_Conge";
import {Type_conge_exceptionnel} from "../Models/Type_conge_exceptionnel";

@Component({
  selector: 'app-retards',
  templateUrl: './retards.component.html',
  styleUrls: ['./retards.component.css']
})
export class RetardsComponent implements OnInit{
  isTableVisible: boolean = false;
  isTableVisible1: boolean = false;
  nombrededemandeenretard!:number;
  nombretroisprochainsjour!:number;
  nombreregulier!:number;
  map3: Map<Type_conge_exceptionnel, number> = new Map();
  key!:any;
  values!:any;
  constructor ( public Userservice:UserserviceService,public sharedservice:SharedserviceService,public DemandeTotal:DemandestotalComponent){

  }



  ngOnInit(): void {
    this.Userservice.getdeandecongeenretard().subscribe((nombre_dem_retard:any)=>{
      this.nombrededemandeenretard=nombre_dem_retard;
      console.log("retard", this.nombrededemandeenretard);
    })
    this.Userservice.getnombretroisprohains().subscribe((nbrtrois:any)=>
    {
      this.nombretroisprochainsjour=nbrtrois;
      console.log("trois", this.nombretroisprochainsjour);
    })
    this.Userservice.getbytypecconge(Type_Conge.regulier).subscribe((data:any)=>{
      this.nombreregulier=data;
    })

    this.Userservice.getmap().subscribe((dataa:Map<Type_conge_exceptionnel, number> )=>{
      this.map3 = dataa;
      this.key= Object.keys(this.map3);
    this.values= Object.values(this.map3);console.log(this.key);
      console.log(this.values);
      console.log(this.map3)
    })
  }
  toggleTable() {
    this.isTableVisible = !this.isTableVisible;
  }
  toggleTable1() {
    this.isTableVisible1 = !this.isTableVisible1;
  }
  protected readonly SharedserviceService = SharedserviceService;
  mapKeys(): Type_conge_exceptionnel[] {
    return this.map3 ? Array.from(this.map3.keys()) : [];
  }
  mapValues(): number[] {
    return this.map3 ? Array.from(this.map3.values()) : [];
  }
}

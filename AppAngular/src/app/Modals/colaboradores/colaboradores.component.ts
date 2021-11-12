import { ColaboradoresService } from './../../colaboradores.service';
import { Colaboradores } from './../../Colaboradores';
import { Component, OnInit, TemplateRef, PipeTransform } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss']
})
export class ColaboradoresComponent implements OnInit {

  formulario: any;
  titulo: any;
  colaboradores: Colaboradores[] = [];
  VisibleTable: boolean = true;
  VisisbleNew: boolean = false;
  VisibleDetail: boolean = false
  VisisbleData: boolean = false
  nomeColaborador: string = "";
  IdColaborador: number = 0;
  modalRef: BsModalRef | undefined;

  colaborador_nome: string = ""
  colaborador_data: string = ""
  colaborador_cpf: string = ""
  colaborador_mae: string = ""
  colaborador_pai: string = ""
  colaborador_email: string = ""
  colaborador_telefone: string = ""

  cols: any[] = [];
  rows = 10;
  first: number = 0;

  constructor(
    private colaboradoresService: ColaboradoresService,
    private modalService: BsModalService
  ) { }


  ngOnInit(): void {

    this.cols = [
      {field: 'nome', header: 'Nome'},
      {field: 'email', header: 'Email'},
    ]

    this.colaboradoresService.Getall().subscribe(res => {
      this.colaboradores = res;
      this.colaboradores.sort(function (a, b) {
        return a.nascimento < b.nascimento ? -1 : a.nascimento > b.nascimento ? 1 : 0;
      })
    })

  }

  ShowCadastro(): void {
    this.VisibleTable = false;
    this.VisisbleNew = true;
    this.titulo = "Novo Colaborador"
    this.formulario = new FormGroup({
      CPF: new FormControl(null),
      NOME: new FormControl(null),
      NOME_MAE: new FormControl(null),
      NOME_PAI: new FormControl(null),
      EMAIL: new FormControl(null),
      TELEFONE: new FormControl(null),
      NASCIMENTO: new FormControl(null),
    })
  }

  Back(): void {
    this.VisibleTable = true;
    this.VisisbleNew = false;
    this.VisisbleData = false;
  }

  Edit(id: any): void {
    this.VisibleTable = false;
    this.VisisbleNew = true;
    this.colaboradoresService.Get(id).subscribe(res => {
      this.titulo = "Atualização do cadastro: " + res.nome;
      this.formulario = new FormGroup({
        ID: new FormControl(res.id),
        CPF: new FormControl(res.cpf),
        NOME: new FormControl(res.nome),
        NOME_MAE: new FormControl(res.nomE_MAE),
        NOME_PAI: new FormControl(res.nomE_PAI),
        EMAIL: new FormControl(res.email),
        TELEFONE: new FormControl(res.telefone),
        NASCIMENTO: new FormControl(res.nascimento),
      })
    })
  }

  Send(): void {
    const Colaboradores: Colaboradores = this.formulario.value;
    if (this.formulario.ID !== 'undefined') {
      this.colaboradoresService.Edit(Colaboradores).subscribe(Registro => {
        this.VisibleTable = true;
        this.VisisbleNew = false;
        alert('Colaborador atualizado com sucesso');
        this.colaboradoresService.Getall().subscribe(registrer => {
          this.colaboradores = registrer;
          this.colaboradores.sort(function (a, b) {
            return a.nascimento < b.nascimento ? -1 : a.nascimento > b.nascimento ? 1 : 0;
          });
        })
      });
    } else {
      this.colaboradoresService.New(Colaboradores).subscribe((res) => {
        this.VisibleTable = true;
        this.VisisbleNew = false;
        alert('Colaborador inserido com sucesso');
        this.colaboradoresService.Getall().subscribe(registrer => {
          this.colaboradores = registrer;
          this.colaboradores.sort(function (a, b) {
            return a.nascimento < b.nascimento ? -1 : a.nascimento > b.nascimento ? 1 : 0;
          });
        })
      });
    }
  }

  ModalDelete(nome: string, id: number, DeletModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(DeletModal);
    this.IdColaborador = id;
    this.nomeColaborador = nome;
  }

  Delete(id: number) {
    this.colaboradoresService.Remove(id).subscribe(res => {
      alert("Colaborador Excluido com sucesso");
      this.modalRef?.hide
      this.colaboradoresService.Getall().subscribe(registrer => {
        this.colaboradores = registrer;
        this.colaboradores.sort(function (a, b) {
          return a.nascimento < b.nascimento ? -1 : a.nascimento > b.nascimento ? 1 : 0;
        });
      })
    })
  }

  ShowData(id: any): void {
    this.VisibleTable = false;
    this.VisisbleData = true;
    this.colaboradoresService.Get(id).subscribe(res => {
      this.colaborador_nome = res.nome;
      this.colaborador_data = res.nascimento;
      this.colaborador_cpf = res.cpf;
      this.colaborador_mae = res.nomE_MAE;
      this.colaborador_pai = res.nomE_PAI;
      this.colaborador_email = res.email;
      this.colaborador_telefone = res.telefone;
    })
  }

  DateCalc(Nascimento: string) {

    // ano atual, e data atual
    var now = (new Date());
    var YerAt = now.getFullYear();

    // aniversario a data presene
    const dataSplit = Nascimento.split('-');
    const day = dataSplit[2];
    const month = dataSplit[1];
    const year = YerAt;
    const MyString = year + "-" + month + "-" + day;
    const dataN = new Date(MyString)

    if (dataN > now) {
      const diff = Math.abs(dataN.getTime() - now.getTime());
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));


      if (days <= 1) {
        return "Amanha!"
      }
      if (days === 365) {
        return "Parabens! é Hoje!"
      }
      return "Faltam: " + days + " Dias";
    }else {
      const year = YerAt + 1;
      const MyString = year + "-" + month + "-" + day;
      const dataN = new Date(MyString);
      const diff = Math.abs(dataN.getTime() - now.getTime());
      const days = Math.ceil(diff / (3600 * 24 * 1000));

      if (days <= 1) {
        return "Amanha!"
      }
      if (days === 365) {
        return "Parabens! é Hoje!"
      }
      return "Faltam: " + days + " Dias";
    }
  }

  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.colaboradores ? this.first === (this.colaboradores.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.colaboradores ? this.first === 0 : true;
}

}


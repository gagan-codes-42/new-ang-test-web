import { Component, OnInit ,ViewChild} from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.scss']
})
export class AgreementsComponent implements OnInit {
  @ViewChild('AggModal', { static: false }) AggModal!: ModalComponent;
  constructor() { }

  ngOnInit(): void {
  }
  openSignModal(){
    this.AggModal.showModal();
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  verifyMobile(){
    
  }
}

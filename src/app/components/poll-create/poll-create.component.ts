import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PollForm } from 'src/app/interfaces/PollForm';

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent implements OnInit {

  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() pollCreated: EventEmitter<PollForm> = new EventEmitter();

  public pollForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.pollForm = this.fb.group({
      question: this.fb.control('', [Validators.required]),
      image: this.fb.control(''),
      option1: this.fb.control(''),
      option2: this.fb.control(''),
      option3: this.fb.control('')
    })
  }

  ngOnInit(): void {

  }

  submitForm() {
    const formData: PollForm = {
      question: this.pollForm.get('question')?.value ?? '',
      thumbnail:  this.pollForm.get('image')?.value ?? '',
      options: [
        this.pollForm.get('option1')?.value ?? '',
        this.pollForm.get('option2')?.value ?? '',
        this.pollForm.get('option3')?.value ?? ''
      ]
    }
    this.pollCreated.emit(formData);
  }

  closeModal() {
    this.closeEvent.emit(true);
    document.body.classList.toggle('modal-open');
  }

}

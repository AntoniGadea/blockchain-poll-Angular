import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ApexCharts from 'apexcharts';
import { Poll } from 'src/app/interfaces/Poll';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.scss']
})
export class PollVoteComponent implements OnInit {

  @ViewChild('chart') chart?: ElementRef;
  @Input() set loadPoll(poll: Poll) {
    this.deleteChart();
    this.poll = poll;
    this.changeRef.detectChanges();
    if(this.poll?.voted) this.createChart();

  }

  public poll?: Poll;
  public voteGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private changeRef: ChangeDetectorRef
  ) {
    this.voteGroup = this.fb.group({
      selected: this.fb.control("", [Validators.required])
    })
  }

  ngOnInit(): void {

  }


  submitForm() {
    console.log(this.voteGroup.value);
  }

  createChart() {
    const options: ApexCharts.ApexOptions = {
      series: [
        {
          data:[1,4,2]
        }
      ],
      chart: {
        height: 350,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true
        }
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: this.poll?.options
      }
    }

    if (this.chart) {
      const chart = new ApexCharts(this.chart.nativeElement, options);
      chart.render();
    }

  }

  deleteChart() {
    if (this.chart) {
      while (this.chart.nativeElement.firstChild) {
        this.chart.nativeElement.removeChild(this.chart.nativeElement.firstChild);
      }
    }
  }


}
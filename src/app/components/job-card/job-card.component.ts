import { Component, Input, OnInit } from '@angular/core';

interface CardData {
  logo: string;
  logoBackground: string;
  contract: string;
  postedAt: string;
  company: string;
  location: string;
  position: string;
}

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent implements OnInit {
  @Input() cardData: CardData | null = null;
  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {

    @Input()
    url!: string;
    
    @Input()
    alt!: string;

    public hasLoaded: boolean = false;

    ngOnInit(): void {
        if(!this.url)  throw new Error('Url property id required.');
        if(!this.alt)  throw new Error('Url property id required.');
    }

    onLoad(): void{
        console.log("imagen cargo");
        this.hasLoaded = true;
        
    }
}

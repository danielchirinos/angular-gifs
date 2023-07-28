import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

// root para que se vea en todo el proyecto
@Injectable({providedIn: 'root'})
export class GifsService {


    public gifList: Gif[] = []
    // es privada para solo editar la variable aqui en el servicio
    private _tagsHistory: string[] = []
    private apiKey: string = "COSsksFCQziIC8KrbYXrJhE3ka05UPCU"
    private sericeUrl: string = "https://api.giphy.com/v1/gifs"

    constructor( private http: HttpClient) {
        this.loadLocalStorage()
        
        
    }
    
    get tagsHistory(){
        return [...this._tagsHistory];
    }

    private organizeHistory(tag:string){
        tag = tag.toLocaleLowerCase()

        if( this._tagsHistory.includes(tag)){
            this._tagsHistory = this.tagsHistory.filter( oldTag  => oldTag != tag)
        }

        this._tagsHistory.unshift(tag)
        this._tagsHistory = this.tagsHistory.splice(0, 10)

        this.saveLocalStorage()
    }

    private saveLocalStorage():void{
        localStorage.setItem("history.gifs", JSON.stringify(this._tagsHistory))
    }

    private loadLocalStorage():void{
        if(!localStorage.getItem("history.gifs")) return;

        this._tagsHistory = JSON.parse( localStorage.getItem("history.gifs")! );

        if(this._tagsHistory.length === 0) return;
        
        this.searchTag(this._tagsHistory[0])
    }

    searchTag( tag:string ):void {

        if(tag.length == 0) return;
        this.organizeHistory(tag)

        const params = new HttpParams()
        .set("api_key", this.apiKey)
        .set("q", tag)
        .set("limit", 10)

        this.http.get<SearchResponse>(`${this.sericeUrl}/search`, { params })
        .subscribe( resp => {
           this.gifList = resp.data
           
        })

        // con fetch en angular directo
        // await fetch("https://api.giphy.com/v1/gifs/search?api_key=COSsksFCQziIC8KrbYXrJhE3ka05UPCU&q=chees&limit=10")
        // .then(resp => resp.json())
        // .then(data => console.log(data));

    }
}
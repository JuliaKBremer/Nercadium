import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-library-start',
  templateUrl: './library-start.component.html',
  styleUrls: ['./library-start.component.css']
})
export class LibraryStartComponent implements OnInit {
  searchtext = '';

  objects = [
    {text: 'Dungeon', cols: 1, rows: 2, tag: 'Scene', favorite: true},
    {text: 'Owlbear', cols: 1, rows: 2, tag: 'Character', favorite: true},
    {text: 'Dagger', cols: 1, rows: 2, tag: 'Object', favorite: false},
    {text: 'Axe', cols: 1, rows: 2, tag: 'Object', favorite: true},
    {text: 'Dangers in the big City', cols: 1, rows: 2, tag: 'Scripts', favorite: true},
    {text: 'Healing Potion', cols: 1, rows: 2, tag: 'Object', favorite: false},
    {text: 'obscure encounter', cols: 1, rows: 2, tag: 'Scripts', favorite: false},
    {text: 'Sword', cols: 1, rows: 2, tag: 'Object', favorite: true},
    {text: 'Club', cols: 1, rows: 2, tag: 'Object', favorite: true},
    {text: 'Bow', cols: 1, rows: 2, tag: 'Object', favorite: false},
    {text: 'Arrows', cols: 1, rows: 2, tag: 'Object', favorite: false},
    {text: 'City', cols: 1, rows: 2, tag: 'Scene', favorite: true},
    {text: 'Orc', cols: 1, rows: 2, tag: 'Character', favorite: false}
  ];

  // values and functions for Pagination
  pageEvent: PageEvent;
  length = this.objects.length;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  constructor() { }

  ngOnInit() {
  }

}

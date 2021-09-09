import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contactList: Contact[] = [];
  first_name:string = '';
  last_name:string = '';
  phone:string = '';

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void{
    this.contactService.getContacts().subscribe(contacts => {
      this.contactList = contacts;
    });
  }

  addContact(): void{
    let newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    };
    this.contactService.addContact(newContact).subscribe(contact => {
      this.getContacts();
    });
  }

  deleteContact(id: string): void{
    this.contactService.deleteContact(id).subscribe(res => {
      if(res.deletedCount === 1){
        for(let i=0; i<this.contactList.length; i++){
          if(this.contactList[i]._id === id){
            this.contactList.splice(i, 1);
          }
        }
      }
    });
  }

}

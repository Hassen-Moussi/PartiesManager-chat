import { Component, OnInit } from '@angular/core';
import { PartyService } from './services/partyservices/party.service';
import { ProfileService } from './services/Profileservice/profile.service';
import { MessageService } from './services/MessageServices/message.service';
import { Profile } from './Models/Profile';
import { Message } from './Models/Message';
import { Party } from './Models/Parties';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  parties: Party[] = [];
  newPartyName: string = '';
  newProfileName: string = '';
  profiles: Profile[] = [];
  searchTerm: string = '';
  filteredProfiles: Profile[] = [];
  selectedProfileId: number | null = null;
  newMessageText: string = '';
  messages: Message[] = [];
  currentUserProfileId?: number;

  constructor(
    private partyService: PartyService,
    private profileService: ProfileService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.fetchParties();
    this.loadProfiles(); // Ensure profiles are loaded initially
  }

  fetchParties() {
    this.partyService.getParties().subscribe(
      (parties: Party[]) => {
        this.parties = parties;
      },
      (error) => {
        console.error('Error fetching parties:', error);
      }
    );
  }

  addParty() {
    this.partyService.createParty(this.newPartyName).subscribe((data: Party) => {
      this.parties.push(data);
      this.newPartyName = '';
    });
  }

  deleteParty(id: any) {
    this.partyService.deleteParty(id).subscribe(() => {
      this.parties = this.parties.filter((party) => party.id !== id);
    });
  }

  updateParty(id: any, state: any) {
    this.partyService.updateParty(id, state).subscribe((updatedParty: Party) => {
      const index = this.parties.findIndex((party) => party.id === id);
      if (index !== -1) {
        this.parties[index] = updatedParty;
      }
    });
  }


  countInactiveParties(): number {
    return this.parties.filter(party => !party.state).length;
  }

  // Chat Section ///////////////////


  loadProfiles(): void {
    this.profileService.getAllProfiles().subscribe(
      (profiles: Profile[]) => {
        this.profiles = profiles;
        this.filteredProfiles = profiles; // Initialize filteredProfiles with all profiles
      },
      (error: any) => {
        console.log('Error loading profiles:', error);
      }
    );
  }

  addProfile(): void {
    this.profileService.createProfile(this.newProfileName).subscribe(
      (data: Profile) => {
        console.log('Profile created successfully:', data);
        this.loadProfiles();
      },
      (error: any) => {
        console.log('Error creating profile:', error);
      }
    );
    this.newProfileName = '';
  }

  searchProfiles(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProfiles = [...this.profiles]; // Reset to show all profiles
      return;
    }
    this.filteredProfiles = this.profiles.filter((profile) =>
      profile.name && profile.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  loadMessages(): void {
    if (this.selectedProfileId) {
      const senderId = 1; // Replace with actual current user's profile ID
      const receiverId = this.selectedProfileId;
      this.messageService.getAllMessages(senderId, receiverId).subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        },
        (error: any) => {
          console.log('Error loading messages:', error);
        }
      );
    }
  }

  sendMessage(): void {
    if (this.selectedProfileId && this.newMessageText.trim()) {
      const senderId = this.currentUserProfileId; // Replace with actual current user's profile ID
      const receiverId = this.selectedProfileId;
      const message: Message = {
        senderId: senderId,
        receiverId: receiverId,
        text: this.newMessageText,
        timestamp: new Date().toISOString() // Adjust as per your backend's requirement
      };
      this.messageService.sendMessage(message).subscribe(
        (data: Message) => {
          console.log('Message sent successfully:', data);
          this.loadMessages();
          this.newMessageText = '';
        },
        (error: any) => {
          console.log('Error sending message:', error);
        }
      );
    }
  }

  startChat(profileId: any): void {
    this.selectedProfileId = profileId;
    this.loadMessages();
  }

  getSelectedProfileName(): string | undefined {
    const selectedProfile = this.profiles.find((profile) => profile.id === this.selectedProfileId);
    return selectedProfile ? selectedProfile.name : undefined;
  }

  getSenderName(message: Message): string | undefined {
    const senderProfile = this.profiles.find((profile) => profile.id === message.senderId);
    return senderProfile ? senderProfile.name : undefined;
  }

  formatTimestamp(timestamp: any): string {
    return new Date(timestamp).toLocaleString();
  }
  selectCurrentUserProfile(profileId: any): void {
    this.currentUserProfileId = profileId;
    
  }
}

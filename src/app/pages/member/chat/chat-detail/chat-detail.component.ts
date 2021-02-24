import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../../../../shared/services';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit {

  userId = null;
  listChat = [];

  fg: FormGroup;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params.id;
    this.initForm();
    this.loadChat();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

  back() {
    this.router.navigate(['member/chat']);
  }

  initForm() {
    this.fg = new FormGroup({
      message: new FormControl(null, Validators.required),
      user_id: new FormControl(this.userId, Validators.required),
    });
  }

  loadChat(): void {
    this.api.getData(`admin/chat/getMessages/?uid=${this.userId}`).subscribe(
      (res) => {
        console.log('res', res);
        this.listChat = res.response.rows.reverse();
        this.scrollToBottom();
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  sendMessage(): void {
    this.api.postData(`admin/chat`, this.fg.value).subscribe(
      (res) => {
        console.log('res', res);
        this.fg.controls.message.patchValue(null);
        this.loadChat();
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

}

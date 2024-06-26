import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
token:any;
  constructor() { }

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: "504629803770-c1plv7bmt0saom4r5hmrdoohlv0hei9f.apps.googleusercontent.com",
      callback: (response: any) => this.handleGoogleSignIn(response)
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { size: "large", type: "icon", shape: "pill" }  // customization attributes
    );
  }

  handleGoogleSignIn(response: any) {
    console.log(response.credential);

    this.token=response.credential;
    alert(response.credential)
    // This next is for decoding the idToken to an object if you want to see the details.
    let base64Url = response.credential.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(JSON.parse(jsonPayload));
  }

}

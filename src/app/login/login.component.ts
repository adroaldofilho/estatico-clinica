import { Component } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  username: string;
  hide = true;
  password: string;
  title = 'auth-guard-demo';
  isLoadingResults = false;
  deviceInfo = null;

  constructor(private auth: AuthenticationService, private router: Router, private deviceService: DeviceDetectorService) {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.deviceInfo = deviceService.getDeviceInfo();
    const isMobile = deviceService.isMobile();
    const isTablet = deviceService.isTablet();
    const isDesktopDevice = deviceService.isDesktop();
    let device = '';
    if (isDesktopDevice){
      device = 'desktop'
    } else {
      device = 'mobile'
    }
    console.log(device);
    localStorage.setItem('device', device);
    // console.log(this.deviceInfo);
    // console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    // console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    // console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
  }

  login(): void {
    if (this.username !== '' && this.password !== '') {
      this.isLoadingResults = true;
      const credentials = {
        email: this.username,
        senha: this.password
      };
      this.auth.getToken(credentials)
      .subscribe((res: any) => {
          const token = res.token;
          localStorage.setItem('currentUser', JSON.stringify(res.usuario));
          localStorage.setItem('token', res.token);
          this.isLoadingResults = false;
          this.router.navigate(['consulta-lista']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
          alert('Senha ou email inválidos!!');
        });


      // if (this.auth.login(this.username, this.password)) {
      //   this.router.navigate(['usuario-lista']);
      // } else {
      //   alert('Wrong username or password');
      // }
    }
  }
}

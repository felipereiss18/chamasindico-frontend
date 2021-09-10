import {AbstractControl} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyPosition, SnotifyService, SnotifyToast} from "ng-snotify";

export class BasicComponent {
  private spinnerService: NgxSpinnerService;
  private snotifyService: SnotifyService;
  protected timeoutMessage = 3000;

  constructor(
    spinnerService: NgxSpinnerService,
    snotifyService: SnotifyService,
  ) {
    this.spinnerService = spinnerService;
    this.snotifyService = snotifyService;
  }

  public getMessageError(control: AbstractControl, name?: string): string {
    if (control?.hasError('required')) {
      return 'Campo Obrigatório.'
    }

    return name + ' inválido';
  }

  public showLoading() {
    this.spinnerService.show('global').then(r => r);
  }

  public closeLoading() {
    this.spinnerService.hide('global').then(r => r);
  }

  public messageError(message: string): void {
    this.snotifyService.error(message, {
      timeout: this.timeoutMessage,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      position: SnotifyPosition.rightTop,
    })
  }

  public messageSucess(message: string): void {
    this.snotifyService.success(message, {
      timeout: this.timeoutMessage,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      position: SnotifyPosition.rightTop,
    })
  }

  public messageInfo(message: string): void {
    this.snotifyService.info(message, {
      timeout: this.timeoutMessage,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      position: SnotifyPosition.rightTop,
    })
  }

  public messageWarning(message: string): void {
    this.snotifyService.warning(message, {
      timeout: this.timeoutMessage,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      position: SnotifyPosition.rightTop,
    })
  }
}

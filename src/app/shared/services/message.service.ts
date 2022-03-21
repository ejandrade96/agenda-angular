// Angular
import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable()
export class MessageService {

  constructor(private toastrService: ToastrService) { }

  public showMessage(messageType: MessageType, message: string, opcoes: Partial<IndividualConfig>) {
    switch (messageType) {
      case MessageType.Success:
        this.toastrService.success(message, "Sucesso!", opcoes);
        break;
      case 1:
        this.toastrService.warning(message, "Atenção!", opcoes);
        break;
      case 2:
      default:
        this.toastrService.error(message, "Erro!", opcoes);
        break;
    }
  }
}

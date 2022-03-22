// Angular
import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable()
export class MessageService {

    constructor(private toastrService: ToastrService) { }

    /**
     * showMessage function
     * @param {string} messageType success | warning | error
     */
    public showMessage(messageType: string, message: string, opcoes: Partial<IndividualConfig>): void {
        switch (messageType.toLowerCase()) {
            case "success":
                this.toastrService.success(message, "Sucesso!", opcoes);
                break;
            case "warning":
                this.toastrService.warning(message, "Atenção!", opcoes);
                break;
            case "error":
            default:
                this.toastrService.error(message, "Erro!", opcoes);
                break;
        }
    }
}

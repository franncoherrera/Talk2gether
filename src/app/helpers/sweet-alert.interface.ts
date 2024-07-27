import { SWEET_ALERT_ICON, SWEET_ALERT_POSITION } from "../shared/enums/sweeAlert.enum";

export interface AlertOptions {
  toast?: boolean;
  position?: SWEET_ALERT_POSITION;
  showConfirmButton?: boolean;
  timer?: number;
  timerProgressBar?: boolean;
  title: string;
  icon: SWEET_ALERT_ICON;
}

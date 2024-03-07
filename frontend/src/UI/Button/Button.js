import "./Button.css";
import { ButtonTypes } from "./ButtonTypes";

function Button(props) {
const { type, btnText, disabled, onClick } = props;

  const getButtonClass = () => {
    switch (type) {
      case ButtonTypes.CREATE:
        return "creteBtn button";

      case ButtonTypes.EDIT:
        return "editBtn button";

      case ButtonTypes.SAVE:
        return "saveBtn";

      case ButtonTypes.CANCEL:
        return "cancelBtn";

      case ButtonTypes.FOLLOW:
        return "followBtn";

      case ButtonTypes.POST:
        return "postBtn";

      case ButtonTypes.DISABLED:
        return "disabled";

        case ButtonTypes.SIGNOUT:
          return "signOut";

          case ButtonTypes.DELETE:
            return "delete"

      default:
        return "primaryBtn";
    }
  };

  return (
    <button
      disabled={disabled}
      type={type === ButtonTypes.DISABLED ? "button" : "submit"}
      onClick={onClick}
      className={getButtonClass()}
    >
      {btnText}
    </button>
  );
}

export default Button;

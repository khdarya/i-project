import {connect} from 'react-redux'
import RecoveryPassword from "./RecoveryPassword";
import {changeInputPass, forgotPass} from "../../bll/recoveryPasswordReducer";

export default connect(null,
    {changeInputPass, forgotPass})(RecoveryPassword)
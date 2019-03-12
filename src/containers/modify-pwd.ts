import { connect } from "react-redux";
import ModifyPwd from "@components/admin/modify-pwd";
import { MODIFY_PASSWORD_HIDE } from "@redux/actions";

export default connect(
    (state: any) => ({visible: state.modifyPwd.visible}),
    {
        hideDialog() {
            return {
                type: MODIFY_PASSWORD_HIDE.type
            }
        }
    }
)(ModifyPwd);
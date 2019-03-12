import UserMenu from "@components/admin/user-menu";
import { connect } from "react-redux";
import { MODIFY_PASSWORD_SHOW } from "@redux/actions";

export default connect(
    state => ({}),
    {
        showPwdDialog() {
            return {
                type: MODIFY_PASSWORD_SHOW.type
            }
        }
    }
)(UserMenu);
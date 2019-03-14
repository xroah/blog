import hint from "./hint-dialog";


export default function getUserConfirmation(msg: string, callback: (arg: boolean) => void) {
    hint.confirm(msg, {
        onOk: () => callback(true),
        onCancel: () => callback(false)
    });
}
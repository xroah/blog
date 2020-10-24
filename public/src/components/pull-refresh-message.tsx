import React from "react"
import ArrowUp from "./icons/arrow-up"
import ArrowDown from "./icons/arrow-down"
import {createUseStyles} from "react-jss"
import {classNames} from "reap-ui/lib/utils"
import Spinner from "reap-ui/lib/Spinner"

const useStyle = createUseStyles({
    "pull-refresh-msg": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        transform: "translateY(-100%)",
        textAlign: "center",

        "&.refreshing": {
            position: "static",
            transform: "none"
        }
    }
})

export default (props: {state?: string}) => {
    const classes = useStyle()
    const {state} = props

    return (
        <div className={
            classNames(
                "text-muted",
                classes["pull-refresh-msg"],
                state === "refreshing" && "refreshing"
            )
        }>
            {
                state === "canRefresh" ? (
                    <>
                        <ArrowUp/>
                        <div>释放刷新</div>
                    </>
                ) : state === "refreshing" ? (
                    <>
                        <Spinner size="sm" animation="border"/>
                        <div>正在刷新</div>
                    </>
                ) : (
                    <>
                        <ArrowDown/>
                        <div>下拉刷新</div>
                    </>
                )
            }
        </div>
    )
}
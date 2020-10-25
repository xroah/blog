import React from "react"
import ArrowUp from "./icons/arrow-up"
import ArrowDown from "./icons/arrow-down"
import classNames from "reap-ui/lib/utils/classNames"
import Spinner from "reap-ui/lib/Spinner"

export default (props: {state?: string}) => {
    const {state} = props

    return (
        <div className={
            classNames(
                "text-muted",
                "pull-refresh-msg",
                state === "refreshing" && "refreshing"
            )
        }>
            {
                state === "canRefresh" ? (
                    <>
                        <ArrowUp />
                        <div>释放刷新</div>
                    </>
                ) : state === "refreshing" ? (
                    <>
                        <Spinner size="sm" animation="border" />
                        <div>正在刷新</div>
                    </>
                ) : (
                            <>
                                <ArrowDown />
                                <div>下拉刷新</div>
                            </>
                        )
            }
        </div>
    )
}
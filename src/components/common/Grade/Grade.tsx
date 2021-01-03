import React, {useCallback} from "react";
import styles from "./Grade.module.css"

export const Grade = React.memo((props: GradePropsType) => {
    const gradeValues: Array<GradeValue> = [1, 2, 3, 4, 5]
    return (
        <div>
            {gradeValues.map(v => <Star isRequestInProgress={props.isRequestInProgress} selected={props.value >= v}
                                        onClick={props.onClick} value={v}/>)}
        </div>
    )
})

export const Star = React.memo((props: StarType) => {
    const setValue = useCallback(() => props.onClick(props.value), [props.onClick, props.value])
    const finalClassName = `${styles.star} ${props.selected ? styles.selected : ''} ${props.isRequestInProgress ? styles.disable : ''}`
    return (
        <span onClick={setValue} className={finalClassName}>{"\u2605"}</span>
    )
})

export type GradeValue = 0 | 1 | 2 | 3 | 4 | 5
type GradePropsType = {
    value: GradeValue
    onClick: (value: GradeValue) => void
    isRequestInProgress?: boolean
}
type StarType = GradePropsType & {
    selected: boolean
}